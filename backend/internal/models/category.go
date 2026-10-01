package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Category struct {
	ID 				bson.ObjectID 		`bson:"_id,omitempty" json:"id"`
	UserID			bson.ObjectID		`bson:"userId,omitempty" json:"userId,omitempty"`	
	CategoryName	string				`bson:"categoryName" json:"categoryName"`	
	BgColor			string				`bson:"bgColor" json:"bgColor"`	
	CategoryIcon	string				`bson:"categoryIcon" json:"categoryIcon"`
	Type 			string				`bson:"type" json:"type"`
	IsDefault		bool				`bson:"isDefault" json:"isDefault"`
	CreatedAt 		time.Time			`bson:"createdAt" json:"createdAt"`
	UpdatedAt 		time.Time			`bson:"updatedAt" json:"updatedAt"`
}
