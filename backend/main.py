from fastapi import FastAPI, UploadFile, File, Form
import pandas as pd
import google.generativeai as genai
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from email_service import send_email

# Explicitly load backend .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# Debug: print key to confirm
print("Using GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Sales Insight API Running"}

@app.post("/upload")
async def upload(file: UploadFile = File(...), email: str = Form(...)):
    try:
        df = pd.read_csv(file.file)
        data_summary = df.describe().to_string()

        prompt = f"""
You are a sales analyst.
Analyze the following sales dataset summary and write a short professional executive summary.
{data_summary}
"""

        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        summary = response.text

        send_email(email, summary)

        return {"summary": summary, "email": email, "note": "Email sent successfully!"}

    except Exception as e:
        print("Error in upload:", e)
        return {"error": str(e)}