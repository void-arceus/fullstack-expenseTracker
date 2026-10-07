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

func (h *Handler) GetTransactions(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(middleware.UserIdKey)
	strUserId, ok := id.(string)

	if !ok {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	userId, err := bson.ObjectIDFromHex(strUserId)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	transactions, err := h.TransactionRepo.GetTransactions(r.Context(), userId)
	if err != nil {
		http.Error(w, "Failed to get Transactions", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool
		Message string
		Data    []models.Transaction
	}{
		Status:  true,
		Message: "Transactions fetched successfully",
		Data:    transactions,
	}

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}

func (h *Handler) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	var reqData models.TransactionUpdate
	id := r.PathValue("id")
	transactionId, err := bson.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid transaction ID", http.StatusBadRequest)
		return
	}

	decodedUserId := r.Context().Value(middleware.UserIdKey)
	strUserId, ok := decodedUserId.(string)

	if !ok {
		http.Error(w, "authentication context missing", http.StatusInternalServerError)
		return
	}

	userId, err := bson.ObjectIDFromHex(strUserId)
	if err != nil {
		http.Error(w, "Invalid HEX format", http.StatusInternalServerError)
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&reqData); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	data := make(map[string]any)
	if reqData.TransactionName != nil {
		data["transactionName"] = *reqData.TransactionName
	}
	if reqData.TransactionType != nil {
		data["transactionType"] = *reqData.TransactionType
	}
	if reqData.TransactionAmount != nil {
		data["transactionAmount"] = *reqData.TransactionAmount
	}
	if reqData.TransactionNote != nil {
		data["transactionNote"] = *reqData.TransactionNote
	}
	if reqData.CategoryID != nil {
		data["categoryId"] = *reqData.CategoryID
	}
	now := time.Now()
	data["updatedAt"] = now

	if err := h.TransactionRepo.UpdateTransaction(r.Context(), transactionId, userId, data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool
		Message string
	}{
		Status:  true,
		Message: "Transaction Deleted Successfully",
	}
	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}

func (h *Handler) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	strTransactionId := r.PathValue("id")
	transactionId, err := bson.ObjectIDFromHex(strTransactionId)
	if err != nil {
		http.Error(w, "invalid transaction id format", http.StatusBadRequest)
		return
	}

	hexUserId := r.Context().Value(middleware.UserIdKey)
	strUserId, ok := hexUserId.(string)
	if !ok {
		http.Error(w, "invalid user id format", http.StatusUnauthorized)
		return
	}
	userId, err := bson.ObjectIDFromHex(strUserId)
	if err != nil {
		http.Error(w, "invalid user id format", http.StatusUnauthorized)
		return
	}
	if err := h.TransactionRepo.DeleteTransaction(r.Context(), transactionId, userId); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool
		Message string
	}{
		Status:  true,
		Message: "Transaction Deleted Successfully",
	}
	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}
