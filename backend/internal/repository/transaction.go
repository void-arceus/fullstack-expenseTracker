package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type TransactionRepository interface {
	AddTransaction(ctx context.Context, data *models.Transaction) error
	GetTransactions(ctx context.Context, id bson.ObjectID, page, limit int64, filter, sortBy string) ([]models.Transaction, error)
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

func (r *MongoTransactionRepository) GetTransactions(ctx context.Context, id bson.ObjectID, page, limit int64, filter, sortBy string) ([]models.Transaction, error) {
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
	opts := options.Find().SetSort(sort).SetSkip(skip).SetLimit(limit)
	cursor, err := collection.Find(ctx, filters, opts)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve the transactins data, %w", err)
	}

	if err := cursor.All(ctx, &transactions); err != nil {
		return nil, fmt.Errorf("internal server error, %w", err)
	}
	return transactions, nil
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
