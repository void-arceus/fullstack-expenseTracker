package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"net/http"
)

func RegisterTransactionRoutes(mux *http.ServeMux, handler handlers.Handler) {
	mux.Handle("POST /transactions",
		middleware.AuthMiddleware(http.HandlerFunc(handler.AddTransaction)),
	)
	mux.Handle("GET /transactions",
		middleware.AuthMiddleware(http.HandlerFunc(handler.GetTransactions)),
	)
	mux.Handle("PATCH /transactions/{id}",
		middleware.AuthMiddleware(http.HandlerFunc(handler.UpdateTransaction)),
	)
}
