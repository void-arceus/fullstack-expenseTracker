# Expense Tracker

A full-stack personal finance tracker where users log income and expenses, organize them with default and custom categories, and visualize their spending. Built with **React + TypeScript** on the frontend and a **Go** REST API backed by **MongoDB**.

> **Project status:** MVP in progress. Core transaction tracking works end to end. Budgets are being built, and charts currently display sample data. See the [Roadmap](#roadmap).

## Features

- **Authentication:** secure login using JWT tokens stored in cookies
- **Transactions:** add income and expense transactions and view them in a list
- **Categories:** five default categories, plus user-created custom categories with a color picker. Custom categories are visible only to the user who created them
- **Pagination and filtering:** server-side pagination with filtering by type (all / expense / income)
- **Charts:** spending charts built with Recharts _(currently showing sample data)_

### In progress

- **Budgets:** per-category budgets with a monthly period. The backend is in place; the UI is being built

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React, TypeScript, Recharts |
| Backend  | Go                          |
| Database | MongoDB                     |
| Auth     | JWT (stored in cookies)     |

## Architecture Notes

- **Identity comes from the server, not the client.** The backend reads the current user's ID from the auth middleware's request context. The frontend never sends a `userId`, so a client cannot act on behalf of another user.
- **Pagination is done on the backend.** The API returns the transactions for the requested page along with `total`, `page`, `limit`, and `totalPages`, and the frontend builds its pagination controls from that response.
- **Feature-based backend structure.** Budgets live in their own Go package with a handler, repository, and routes, keeping HTTP handling and database access separated.
- **Input validation on the server.** Empty category names are rejected and names are trimmed. Budget amounts and periods are validated before saving.

## Data Model

- **Transaction:** `userId`, `transactionName`, `transactionType`, `transactionAmount`, `transactionDate`, `categoryId`, `createdAt`, `updatedAt`
- **Budget:** `userId`, `categoryId`, `budgetAmount`, `period`, `startDate`, `createdAt`, `updatedAt`

## Getting Started

### Prerequisites

- [Go](https://go.dev/dl/) (version 1.xx or newer)
- [Node.js](https://nodejs.org/) (version xx or newer) and npm
- A running MongoDB instance, either local or hosted (for example MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/void_arceus/fullstack-expenseTracker.git
cd fullstack-expenseTracker
```

### 2. Start the backend

From the `backend` folder, create a `.env` file with the following variables:

| Variable       | Description                    |
| -------------- | ------------------------------ |
| `<MONGO_URI>`  | MongoDB connection string      |
| `<JWT_SECRET>` | Secret used to sign JWT tokens |
| `<PORT>`       | Port the backend listens on    |

Then run:

```bash
cd backend
go run cmd/api/main.go
```

The API will be running at `http://localhost:8080`. Keep this terminal open.

### 3. Start the frontend

Open a second terminal, then run:

```bash
cd frontend
npm install
npm run dev
```

The terminal will print the local URL (usually `http://localhost:5173`). Open it in your browser, create an account, and start adding transactions.

## Roadmap

In the order I plan to build them:

- [ ] Budgets UI for per-category monthly budgets
- [ ] Charts powered by the logged-in user's real transaction data
- [ ] Basic user settings (currency choice)
- [ ] Yearly and weekly budget periods
- [ ] Category deletion behavior

## Author

**void_arceus**
