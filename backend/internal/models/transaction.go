package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Transaction struct {
	ID                bson.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID            bson.ObjectID `bson:"userId" json:"userId"`
	TransactionType   string        `bson:"transactionType" json:"transactionType"`
	TransactionAmount int64         `bson:"transactionAmount" json:"transactionAmount"`
	TransactionDate   time.Time     `bson:"transactionDate" json:"transactionDate"`
	Note              string        `bson:"note,omitempty" json:"note,omitempty"`
	CategoryID        bson.ObjectID `bson:"categoryId" json:"categoryId"`
	CreatedAt         time.Time     `bson:"createdAt" json:"createdAt"`
	UpdatedAt         time.Time     `bson:"updatedAt" json:"updatedAt"`
}
