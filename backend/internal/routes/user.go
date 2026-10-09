package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"net/http"
)

func RegisterUserRoutes(mux *http.ServeMux, handler handlers.Handler) {
	mux.HandleFunc("POST /users", handler.CreateUser)
	mux.HandleFunc("POST /login", handler.Login)
	mux.HandleFunc("POST /logout", handler.Logout)
	mux.Handle(
		"GET /me",
		middleware.AuthMiddleware(http.HandlerFunc(handler.GetCurrentUser)),
	)
}
