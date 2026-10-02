package main

import (
	"backend/internal/db"
	"backend/internal/handlers"
	"backend/internal/repository"
	"backend/internal/routes"
	"context"
	"log"
	"net/http"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, defaulting to system environment variables")
	}

	database, err := db.Connect()
	if err != nil {
		log.Fatalf("Database initialization failed: %v", err)
	}

	mux := http.NewServeMux()

	userRepo := &repository.MongoUserRepository{
		DB: database,
	}

	handler := handlers.Handler{
		UserRepo: userRepo,
	}

	routes.RegisterUserRoutes(mux, handler)

	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := database.Close(ctx); err != nil {
			log.Printf("Error Closing Database Connection, %v", err)
		} else {
			log.Println("MongoDB connection closed gracefully")
		}
	}()

	log.Printf("Backend server booted and connected successfully!")

	log.Printf("Server is running on PORT: 8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Failed to start the server, %v", err)
	}

}
