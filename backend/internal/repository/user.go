package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error // success -> nil, failure -> error
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
