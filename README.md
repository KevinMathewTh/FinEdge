FinEdge – Personal Finance & Expense Tracker API

FinEdge is a modular RESTful backend built using Node.js and Express.
It allows users to manage authentication, track income and expenses, set monthly budgets, and view financial summaries.
The project follows MVC architecture, uses reusable services, middleware, and JSON-based data persistence.

Project Structure
src/
├── app.js
├── routes/
│   ├── userRoutes.js
│   ├── transactionRoutes.js
│   └── budgetRoutes.js
├── controllers/
│   ├── userController.js
│   ├── transactionController.js
│   └── budgetController.js
├── services/
│   ├── userService.js
│   ├── transactionService.js
│   └── budgetService.js
├── models/
│   ├── userModel.js
│   ├── transactionModel.js
│   └── budgetModel.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validator.js
├── utils/
│   ├── asyncHandler.js
│   ├── AppError.js
│   └── analytics.js
└── data/
    ├── users.json
    ├── transactions.json
    └── budgets.json

Features
1. User Module

Register and login

Password hashing

JWT authentication

User preferences (optional)

Endpoints:

POST /register
POST /login

2. Transaction Module

Create income or expense transactions

Update, delete, and view transactions

Filters by type, category, and date range

Response formatting using custom middleware

Endpoints:

POST /transactions
GET /transactions
GET /transactions/:id
PATCH /transactions/:id
DELETE /transactions/:id

3. Budget Module

Set a monthly budget and savings target

Get budget for a specific month

Budget summary based on user transactions

Indicates whether the user is within or over budget

Endpoints:

POST /budget
GET /budget?month=YYYY-MM
GET /budget/summary?month=YYYY-MM

4. Summary & Analytics

Total income

Total expenses

Balance

Category breakdown

Per-user summary

Endpoint:

GET /summary

Middleware

Authentication middleware (JWT-based)

Error handling middleware

Logging middleware

Validation middleware

Pretty JSON response middleware

Installation and Setup
1. Clone the Repository
git clone <repository-url>
cd FinEdge

2. Install Dependencies
npm install

3. Create a .env File
JWT_SECRET=your-secret-key
PORT=3000
APP_NAME=FinEdge

4. Start the Server

Development:

npm run dev


Production:

npm start


Server runs at:

http://localhost:3000

Authentication

Protected routes require an Authorization header:

Authorization: Bearer <token>


Token is returned from:

POST /login

Testing (Optional)

Transaction module tests can be run using Jest:

npm test

Data Storage

The application uses JSON files for persistence:

data/users.json
data/transactions.json
data/budgets.json


Example budget entry:

{
  "userId": "12345",
  "month": "2025-12",
  "budgetAmount": 40000,
  "savingsTarget": 10000
}

Conclusion

This project implements a complete personal finance backend with user authentication, transaction management, budgeting, analytics, and middleware-based modular design.
It follows clean architecture principles and is easy to extend or integrate with a frontend or mobile application.
