package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type TransactionRepository interface {
	AddTransaction(ctx context.Context, data *models.Transaction) error
	GetTransactions(ctx context.Context, id bson.ObjectID, page, limit int64, filter, sortBy string) ([]models.Transaction, int64, error)
	UpdateTransaction(ctx context.Context, transactionId, userId bson.ObjectID, data map[string]any) error
	DeleteTransaction(ctx context.Context, transactionId, userId bson.ObjectID) error
}

type MongoTransactionRepository struct {
	DB *db.Database
}

func (r *MongoTransactionRepository) AddTransaction(ctx context.Context, data *models.Transaction) error {
	collection := r.DB.GetCollection("transactions")
	_, err := collection.InsertOne(ctx, data)
	if err != nil {
		return fmt.Errorf("Failed to add transaction, %w", err)
	}
	return nil
}

func (r *MongoTransactionRepository) GetTransactions(ctx context.Context, id bson.ObjectID, page, limit int64, filter, sortBy string) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	collection := r.DB.GetCollection("transactions")

	var sortValue int64

	if sortBy == "asc" {
		sortValue = 1
	} else {
		sortValue = -1
	}

	filters := bson.D{
		{Key: "userId", Value: id},
	}

	if filter != "all" {
		filters = append(filters, bson.E{
			Key: "transactionType", Value: filter,
		})
	}

	sort := bson.D{{Key: "createdAt", Value: sortValue}}
	skip := (page - 1) * limit

	pipeline := mongo.Pipeline{
		bson.D{{Key: "$match", Value: filters}},
		bson.D{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "categories"},
			{Key: "localField", Value: "categoryId"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "category"},
		}}},
		bson.D{{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$category"},
			{Key: "preserveNullAndEmptyArrays", Value: true},
		}}},
		bson.D{{Key: "$sort", Value: sort}},
		bson.D{{Key: "$skip", Value: skip}},
		bson.D{{Key: "$limit", Value: limit}},
	}

	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, -1, fmt.Errorf("failed to retrieve the transactins data, %w", err)
	}
	defer cursor.Close(ctx)

	total, err := collection.CountDocuments(ctx, filters)

	if err := cursor.All(ctx, &transactions); err != nil {
		return nil, -1, fmt.Errorf("internal server error, %w", err)
	}
	return transactions, total, nil
}

func (r *MongoTransactionRepository) UpdateTransaction(ctx context.Context, transactionId, userId bson.ObjectID, data map[string]any) error {
	collection := r.DB.GetCollection("transactions")
	filter := bson.D{{Key: "_id", Value: transactionId}, {Key: "userId", Value: userId}}
	update := bson.M{"$set": data}
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return fmt.Errorf("failed to update transaction, %w", err)
	}
	return nil
}

func (r *MongoTransactionRepository) DeleteTransaction(ctx context.Context, transactionId, userId bson.ObjectID) error {
	collection := r.DB.GetCollection("transactions")
	filter := bson.D{{Key: "_id", Value: transactionId}, {Key: "userId", Value: userId}}

	_, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		return fmt.Errorf("failed to delete the transaction, %w", err)
	}
	return nil
}
