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

func (h *Handler) AddCategory(w http.ResponseWriter, r *http.Request) {
	var categoryData models.Category

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&categoryData); err != nil {
		http.Error(w, "invalid JSON data", http.StatusBadRequest)
		return
	}

	if categoryData.CategoryName == "" {
		http.Error(w, "category name cannot be an empty string", http.StatusBadRequest)
		return
	}

	colorLength := len(categoryData.BgColor)

	if categoryData.BgColor == "" && categoryData.BgColor[0] != '#' && colorLength != 4 && colorLength != 5 && colorLength != 7 && colorLength != 9 {
		http.Error(w, "invalid hex color format", http.StatusBadRequest)
		return
	}

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

	categoryData.UserID = userId
	categoryData.IsDefault = false

	err = h.CategoryRepo.AddCategory(r.Context(), categoryData)
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
		Message: "Category Added Successfully",
	}

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "    ")
	encoder.Encode(&response)
}
