package main

import (
	"backend/internal/db"
	"context"
	"log"
	"time"

	"github.com/joho/godotenv"
)

func main () {
	// load variable from env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}


	// connect to mongoDB and ping
	database, err := db.Connect()
	if err != nil {
		log.Fatalf("Database connection failed %w", err)
	}

	// ensure graceful disconnection when application stops
	defer func () {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := database.Close(ctx); err != nil {
			log.Printf("Error Closing Database Connection %v", err)
		}
	}()
	
}
	


