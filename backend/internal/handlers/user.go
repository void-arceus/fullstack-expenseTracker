package handlers

import (
	"backend/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserResponse struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
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
	// search for the email
	var loginCredentials LoginCredentials
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&loginCredentials); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	data, err := h.UserRepo.GetUserByEmail(r.Context(), loginCredentials.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(data.Password), []byte(loginCredentials.Password)); err != nil {
		http.Error(w, "Invalid User Credentials", http.StatusBadRequest)
		return
	}

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
	encode.SetIndent("", " ")
	encode.Encode(response)
}
