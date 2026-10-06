package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
}

type MongoUserRepository struct {
	DB *db.Database
}

var categoryColors = map[string]string{
	"food":              "#F59E0B",
	"transport":         "#3B82F6",
	"shopping":          "#A855F7",
	"entertainment":     "#EC4899",
	"bills & utilities": "#14B8A6",
}

func (r *MongoUserRepository) CreateUser(ctx context.Context, user *models.User) error {
	collection := r.DB.GetCollection("users")
	_, err := collection.InsertOne(ctx, user)
	if err != nil {
		return fmt.Errorf("failed to create the user, %w", err)
	}
	categories := []string{"food", "transport", "shopping", "entertainment", "bills & utilities"}

	now := time.Now()
	categoryCollection := r.DB.GetCollection("categories")
	for _, val := range categories {
		cat := models.Category{
			UserID:       user.ID,
			CategoryName: val,
			BgColor:      categoryColors[val],
			CategoryIcon: "none",
			IsDefault:    true,
			CreatedAt:    now,
			UpdatedAt:    now,
		}
		_, err := categoryCollection.InsertOne(ctx, cat)
		if err != nil {
			return fmt.Errorf("Failed to create Default Categories, %w", err)
		}
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
