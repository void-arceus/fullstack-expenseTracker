package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Database struct {
	Client		*mongo.Client
	Db 			*mongo.Database
}

func Connect () (*Database, error) {
	mongoURI := os.Getenv("MONGO_URI")	
	if mongoURI == "" {
		return nil, fmt.Errorf("MONGO_URI environment variable not set")
	}

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "expense-tracker"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		return nil, fmt.Errorf("Failed to create mongoDB client, %w", err)
	}

	if err := client.Ping(ctx, nil); err != nil {
		return nil, fmt.Errorf("Failed to ping Mongo client, %w", err) 
	}

	log.Printf("Successfully connected to MongoDB database, %s", dbName)

	return &Database {
		Client: client,
		Db: client.Database(dbName),
	}, nil
}

func (d *Database) GetCollection (name string) *mongo.Collection {
	return d.Db.Collection(name)
}

func (d *Database) Close (ctx context.Context) error {
	if d.Client == nil {
		return nil
	}
	return d.Client.Disconnect(ctx)
}
