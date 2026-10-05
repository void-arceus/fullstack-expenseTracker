package handlers

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type TransactionCredential struct {
	TransactionName   string    `json:"transactionName"`
	TransactionAmount int64     `json:"transactionAmount"`
	TransactionNote   string    `json:"transactionNote omitempty"`
	TransactionDate   time.Time `json:"transactionDate"`
	TransactionType   string    `json:"transactionType"`
	CategoryID        string    `json:"categoryId"`
}

func (h *Handler) AddTransaction(w http.ResponseWriter, r *http.Request) {
	var reqData TransactionCredential
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&reqData); err != nil {
		http.Error(w, "Invalid JSON Data", http.StatusBadRequest)
		return
	}

	if reqData.TransactionAmount < 0 || reqData.TransactionName == "" || reqData.TransactionType == "" {
		http.Error(w, "Invalid or Missing Transaction Data", http.StatusBadRequest)
		return
	}

	now := time.Now()

	categoryID, err := bson.ObjectIDFromHex(reqData.CategoryID)
	if err != nil {
		http.Error(w, "Invalid Category ID", http.StatusBadRequest)
		return
	}

	strUserId := r.Context().Value(middleware.UserIdKey)
	userId, ok := strUserId.(string)
	if !ok {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	bsonUserId, err := bson.ObjectIDFromHex(userId)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	data := models.Transaction{
		TransactionName:   reqData.TransactionName,
		TransactionType:   reqData.TransactionType,
		TransactionAmount: reqData.TransactionAmount,
		TransactionNote:   reqData.TransactionNote,
		TransactionDate:   reqData.TransactionDate,
		CategoryID:        categoryID,
		UserID:            bsonUserId,
		CreatedAt:         now,
		UpdatedAt:         now,
	}

	if err := h.TransactionRepo.AddTransaction(r.Context(), &data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool
		Message string
	}{
		Status:  true,
		Message: "Transaction Added Successfully",
	}
	w.WriteHeader(http.StatusCreated)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(response)
}
