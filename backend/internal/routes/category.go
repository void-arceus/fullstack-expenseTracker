package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"net/http"
)

func RegisterCategoryRoutes(mux *http.ServeMux, h handlers.Handler) {
	mux.Handle("GET /categories",
		middleware.AuthMiddleware(http.HandlerFunc(h.GetCategories)),
	)

	mux.Handle("POST /categories",
		middleware.AuthMiddleware(http.HandlerFunc(h.AddCategory)),
	)
}
