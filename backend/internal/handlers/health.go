package handlers

import (
	"backend/internal/repository"
	"fmt"
	"net/http"
)

type Handler struct {
	UserRepo        repository.UserRepository
	TransactionRepo repository.TransactionRepository
	CategoryRepo    repository.MongoCategoryRepository
	BudgetRepo      repository.MongoBudgetRepository
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server is healthy")
}
