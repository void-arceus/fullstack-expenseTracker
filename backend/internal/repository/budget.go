package repository

import (
	"backend/internal/db"
	"backend/internal/models"
	"context"
	"fmt"
)

type BudgetRepository interface {
	CreateBudget(ctx context.Context, budgetData models.Budget) error
}

type MongoBudgetRepository struct {
	DB *db.Database
}

func (r *MongoBudgetRepository) CreateBudget(ctx context.Context, budgetData models.Budget) error {
	collection := r.DB.GetCollection("budgets")
	_, err := collection.InsertOne(ctx, budgetData)
	if err != nil {
		return fmt.Errorf("failed to create the budget, %w", err)
	}
	return nil
}
