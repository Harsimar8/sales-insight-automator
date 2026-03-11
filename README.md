Sales Insight Automator
Project Overview

Sales Insight Automator is a web app that allows users to upload a sales CSV file, generate an AI-powered executive summary of the data, and send the summary via email.
Flow:

Upload CSV →

AI generates summary using Google Gemini API →

Summary sent to user email.

Tech Stack

Frontend: React

Backend: FastAPI

AI: Google Gemini API (genai)

Email: Gmail SMTP

Deployment: Render (Frontend + Backend), Docker support

Running Locally
1️⃣ Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000

API docs available at: http://127.0.0.1:8000/docs

2️⃣ Frontend
cd frontend
npm install
npm start

App runs at http://localhost:3000

3️⃣ Docker Option

If you prefer Docker, you can use the provided Dockerfile in frontend and backend to build images and run containers:

# Backend
docker build -t sales-backend ./backend
docker run -p 8000:8000 sales-backend

# Frontend
docker build -t sales-frontend ./frontend
docker run -p 3000:3000 sales-frontend
Environment Variables
Backend .env
GEMINI_API_KEY=your_google_gemini_api_key
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_APP_PASSWORD=your_email_app_password
Frontend .env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000  # or your deployed backend URL
SKIP_PREFLIGHT_CHECK=true

Note: Do NOT commit your real API keys or passwords. Use .env.example in GitHub for reference.

Securing Endpoints

CORS: Only allows requests from your frontend URL.

API Key: Gemini API key is kept in .env (not in frontend).

Email Security: Gmail App password used for sending emails, stored in backend .env.

Swagger Documentation

FastAPI automatically provides interactive docs:

http://127.0.0.1:8000/docs

You can test all endpoints here.

CI/CD / Deployment

Frontend deployed on Render at: https://sales-insight-frontend-seg5.onrender.com/

Backend deployed on Render at: https://sales-insight-automator-1-oxnn.onrender.com/

Docker used to build images locally or for cloud deployment.

How to Test

Go to the frontend URL.

Upload a CSV file.

Enter your email.

Click Upload & Generate.

Check your inbox for the AI-generated summary