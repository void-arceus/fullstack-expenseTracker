package handlers

import (
	"backend/internal/repository"
	"fmt"
	"net/http"
)

type Handler struct {
	UserRepo repository.UserRepository
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server is healthy")
}
