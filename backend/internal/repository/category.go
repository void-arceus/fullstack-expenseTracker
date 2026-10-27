package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type CategoryRepository interface {
	GetCategories(ctx context.Context, id bson.ObjectID) ([]models.Category, error)
	AddCategory(ctx context.Context, categoryData models.Category) error
}

type MongoCategoryRepository struct {
	DB *db.Database
}

func (r *MongoCategoryRepository) GetCategories(ctx context.Context, id bson.ObjectID) ([]models.Category, error) {
	var categories []models.Category

	collection := r.DB.GetCollection("categories")
	filter := bson.D{{Key: "userId", Value: id}}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, fmt.Errorf("Categories not found")
	}

	if err := cursor.All(ctx, &categories); err != nil {
		return nil, fmt.Errorf("Something went wrong")
	}

	return categories, nil
}

func (r *MongoCategoryRepository) AddCategory(ctx context.Context, categoryData models.Category) error {
	collection := r.DB.GetCollection("categories")

	_, err := collection.InsertOne(ctx, categoryData)
	if err != nil {
		return fmt.Errorf("Failed to add category, %w", err)
	}

	return nil
}
