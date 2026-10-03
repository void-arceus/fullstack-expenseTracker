package handlers

import (
	"backend/internal/models"
	"encoding/json"
	"net/http"
	"time"
)

type UserResponse struct {
	Username string `json:"username"`
	Email    string `json:"email"`
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

	now := time.Now()

	user := models.User{
		Username:  reqData.Username,
		Email:     reqData.Email,
		Password:  reqData.Password,
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
