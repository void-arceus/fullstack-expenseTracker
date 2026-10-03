package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error // success -> nil, failure -> error
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
}

type MongoUserRepository struct {
	DB *db.Database
}

func (r *MongoUserRepository) CreateUser(ctx context.Context, user *models.User) error {
	collection := r.DB.GetCollection("users")
	_, err := collection.InsertOne(ctx, user)
	if err != nil {
		return fmt.Errorf("failed to create the user, %w", err)
	}
	return nil
}

func (r *MongoUserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	collection := r.DB.GetCollection("users")
	if err := collection.FindOne(ctx, bson.D{{Key: "email", Value: email}}).Decode(&user); err != nil {
		return nil, fmt.Errorf("User not found!")
	}
	return &user, nil
}
