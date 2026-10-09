package handlers

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
	"golang.org/x/crypto/bcrypt"
)

type UserResponse struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type LoginCredentials struct {
	Email      string `json:"email"`
	Password   string `json:"password"`
	RememberMe bool   `json:"rememberMe"`
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var reqData models.RegisterUser
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&reqData); err != nil {
		http.Error(w, "Invalid JSON Data", http.StatusBadRequest)
		return
	}
	if reqData.Username == "" || reqData.Email == "" || reqData.Password == "" || reqData.ConfirmPassword == "" {
		http.Error(w, "Missing user Credentials", http.StatusBadRequest)
		return
	}

	if reqData.Password != reqData.ConfirmPassword {
		http.Error(w, "Password and confirm password didn't matched", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(reqData.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Password hashing failed", http.StatusInternalServerError)
		return
	}

	now := time.Now()

	user := models.User{
		ID:        bson.NewObjectID(),
		Username:  reqData.Username,
		Email:     reqData.Email,
		Password:  string(hashedPassword),
		CreatedAt: now,
		UpdatedAt: now,
	}

	if err := h.UserRepo.CreateUser(r.Context(), &user); err != nil {
		http.Error(w, "Failed to Create User", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool         `json:"status"`
		Message string       `json:"message"`
		Data    UserResponse `json:"data"`
	}{
		Status:  true,
		Message: "User Created Successfully",
		Data: UserResponse{
			Username: user.Username,
			Email:    user.Email,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	jwtSecret := os.Getenv("JWT_SECRET")
	var loginCredentials LoginCredentials
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&loginCredentials); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	var sessionDuration time.Duration
	if loginCredentials.RememberMe {
		sessionDuration = 24 * time.Hour * 30
	} else {
		sessionDuration = 24 * time.Hour * 1
	}

	maxAgeSeconds := int(sessionDuration.Seconds())
	expiresTimeStamp := time.Now().Add(sessionDuration)

	data, err := h.UserRepo.GetUserByEmail(r.Context(), loginCredentials.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(data.Password), []byte(loginCredentials.Password)); err != nil {
		http.Error(w, "Invalid User Credentials", http.StatusBadRequest)
		return
	}

	claims := jwt.MapClaims{
		"userId": data.ID.Hex(),
		"exp":    expiresTimeStamp.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecret))

	if err != nil {
		fmt.Println("JWT Failed, %w", err)
		http.Error(w, "JWT Creation failed", http.StatusInternalServerError)
		return
	}

	// set http cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt_token",
		Value:    tokenString,
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		MaxAge:   maxAgeSeconds,
		Expires:  expiresTimeStamp,
	})

	response := struct {
		Status  bool        `json:"status"`
		Message string      `json:"message"`
		Data    models.User `json:"data"`
	}{
		Status:  true,
		Message: "Logged In Successfully",
		Data:    *data,
	}

	w.WriteHeader(http.StatusOK)
	encode := json.NewEncoder(w)
	encode.SetIndent("", "    ")
	encode.Encode(response)
}

func (h *Handler) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(middleware.UserIdKey)
	strUserId, ok := id.(string)
	if !ok {
		http.Error(w, "invalid user id", http.StatusInternalServerError)
		return
	}

	userId, err := bson.ObjectIDFromHex(strUserId)
	if err != nil {
		http.Error(w, "invalid user id format", http.StatusInternalServerError)
		return
	}

	data, err := h.UserRepo.GetUserById(r.Context(), userId)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool        `json:"status"`
		Message string      `json:"message"`
		Data    models.User `json:"data"`
	}{
		Status:  true,
		Message: "User is logged in",
		Data:    *data,
	}

	w.WriteHeader(http.StatusOK)
	encode := json.NewEncoder(w)
	encode.SetIndent("", "    ")
	encode.Encode(response)
}

func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	expiredCookie := &http.Cookie{
		Name:     "jwt_token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
		Secure:   true,
	}
	http.SetCookie(w, expiredCookie)
	w.WriteHeader(http.StatusOK)
}
