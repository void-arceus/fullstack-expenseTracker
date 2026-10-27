package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"net/http"
)

func RegisterBudgetRoutes(mux *http.ServeMux, h handlers.Handler) {
	mux.Handle("POST /budget",
		middleware.AuthMiddleware(http.HandlerFunc(h.CreateBudget)))
}
