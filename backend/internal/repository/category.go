package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type CategoryRepository interface {
	GetCategories(ctx context.Context, id bson.ObjectID) ([]models.UserCategory, error)
	AddCategory(ctx context.Context, categoryData models.Category) error
}

type MongoCategoryRepository struct {
	DB *db.Database
}

func (r *MongoCategoryRepository) GetCategories(ctx context.Context, id bson.ObjectID) ([]models.UserCategory, error) {
	var categories []models.UserCategory

	collection := r.DB.GetCollection("categories")
	filter := bson.D{{Key: "userId", Value: id}}

	// todo := also return total spending of each category
	pipeline := mongo.Pipeline{
		bson.D{{Key: "$match", Value: filter}},
		bson.D{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "budgets"},
			{Key: "localField", Value: "_id"},
			{Key: "foreignField", Value: "categoryId"},
			{Key: "as", Value: "budget"},
		}}},
		bson.D{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$budget"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},
	}

	cursor, err := collection.Aggregate(ctx, pipeline)
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
