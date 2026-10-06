package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type TransactionRepository interface {
	AddTransaction(ctx context.Context, data *models.Transaction) error
	GetTransactions(ctx context.Context, id bson.ObjectID) ([]models.Transaction, error)
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

func (r *MongoTransactionRepository) GetTransactions(ctx context.Context, id bson.ObjectID) ([]models.Transaction, error) {
	var transactions []models.Transaction
	collection := r.DB.GetCollection("transactions")
	cursor, err := collection.Find(ctx, bson.D{{Key: "userId", Value: id}})
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve the transactins data, %w", err)
	}

	if err := cursor.All(ctx, &transactions); err != nil {
		return nil, fmt.Errorf("internal server error, %w", err)
	}
	return transactions, nil
}
