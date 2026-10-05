package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
)

type TransactionRepository interface {
	AddTransaction(ctx context.Context, data *models.Transaction) error
}

type MongoTransactionRepository struct {
	DB *db.Database
}

func (r *MongoTransactionRepository) AddTransaction(ctx context.Context, data *models.Transaction) error {

	return nil
}
