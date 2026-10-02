package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Budget struct {
	ID           bson.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID       bson.ObjectID `bson:"userId" json:"userId"`
	CategoryID   bson.ObjectID `bson:"categoryId" json:"categoryId"`
	BudgetAmount int64         `bson:"budgetAmount" json:"budgetAmount"`
	Period       string        `bson:"period" json:"period"`
	StartDate    time.Time     `bson:"startDate" json:"startDate"`
	CreatedAt    time.Time     `bson:"createdAt" json:"createdAt"`
	UpdatedAt    time.Time     `bson:"updatedAt" json:"updatedAt"`
}
