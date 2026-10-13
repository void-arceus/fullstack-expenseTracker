package handlers

import (
	"backend/internal/middleware"
	"backend/internal/models"
	"encoding/json"
	"net/http"

	"go.mongodb.org/mongo-driver/v2/bson"
)

func (h *Handler) GetCategories(w http.ResponseWriter, r *http.Request) {
	strUserId := r.Context().Value(middleware.UserIdKey)
	strId, ok := strUserId.(string)

	if !ok {
		http.Error(w, "invalid user id format", http.StatusBadRequest)
		return
	}
	userId, err := bson.ObjectIDFromHex(strId)
	if err != nil {
		http.Error(w, "provided user id is not valid type", http.StatusBadRequest)
		return
	}

	categories, err := h.CategoryRepo.GetCategories(r.Context(), userId)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	response := struct {
		Status  bool              `json:"status"`
		Message string            `json:"message"`
		Data    []models.Category `json:"data"`
	}{
		Status:  true,
		Message: "Categories fetched successfully",
		Data:    categories,
	}

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}
