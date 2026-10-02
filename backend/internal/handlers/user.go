package handlers

import (
	"backend/internal/models"
	"encoding/json"
	"net/http"
	"time"
)

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		http.Error(w, "Invalid JSON Data", http.StatusBadRequest)
		return
	}
	if user.Username == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "Missing user Credentials", http.StatusBadRequest)
		return
	}
	now := time.Now()
	user.CreatedAt = now
	user.UpdatedAt = now
	if err := h.UserRepo.CreateUser(r.Context(), &user); err != nil {
		http.Error(w, "Failed to Create User", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
