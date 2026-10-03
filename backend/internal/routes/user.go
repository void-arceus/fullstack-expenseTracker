package routes

import (
	"backend/internal/handlers"
	"net/http"
)

func RegisterUserRoutes(mux *http.ServeMux, handler handlers.Handler) {
	mux.HandleFunc("POST /users", handler.CreateUser)
	mux.HandleFunc("POST /login", handler.Login)
}
