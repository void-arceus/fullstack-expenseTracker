package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const userIdKey contextKey = "userId"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jwtSecret := os.Getenv("JWT_SECRET")
		parts := strings.Split(r.Header.Get("Authorization"), " ")
		var tokenString string

		if len(parts) == 2 && parts[0] == "Bearer" {
			tokenString = parts[1]
		} else {
			http.Error(w, "Invalid or Bearer Token not provided", http.StatusUnauthorized)
			return
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if token.Method != jwt.SigningMethodHS256 {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return []byte(jwtSecret), nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized, Invalid Token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			http.Error(w, "Invalid Token Claims", http.StatusUnauthorized)
			return
		}

		userId := claims["userId"]

		ctx := context.WithValue(r.Context(), userIdKey, userId)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
