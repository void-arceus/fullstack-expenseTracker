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
}
