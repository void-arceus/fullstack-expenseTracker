package handlers

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/v2/bson"
)

func (h *Handler) CreateBudget(w http.ResponseWriter, r *http.Request) {
	userStr := r.Context().Value(middleware.UserIdKey)
	strID, ok := userStr.(string)
	if !ok {
		http.Error(w, "invalid user id format", http.StatusBadRequest)
		return
	}

	userID, err := bson.ObjectIDFromHex(strID)
	if err != nil {
		http.Error(w, "invalid user ID hex format", http.StatusBadRequest)
		return
	}

	var budgetData models.Budget
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&budgetData); err != nil {
		http.Error(w, "invalid json data", http.StatusBadRequest)
		return
	}

	if budgetData.BudgetAmount < 0 {
		http.Error(w, "amount cannot be negative", http.StatusBadRequest)
		return
	}

	if budgetData.Period != "weekly" && budgetData.Period != "monthly" && budgetData.Period != "yearly" {
		http.Error(w, "invalid budget period", http.StatusBadRequest)
		return
	}
	budgetData.UserID = userID

	if err := h.BudgetRepo.CreateBudget(r.Context(), budgetData); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool
		Message string
	}{
		Status:  true,
		Message: "Budget created successfully",
	}

	w.WriteHeader(http.StatusCreated)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}
