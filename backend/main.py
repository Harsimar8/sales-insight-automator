from fastapi import FastAPI, UploadFile, File, Form
import pandas as pd
import google.generativeai as genai
import os
from dotenv import load_dotenv
from email_service import send_email  # import email function

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Sales Insight API Running"}

@app.post("/upload")
async def upload(file: UploadFile = File(...), email: str = Form(...)):

    # 1️⃣ Read CSV
    df = pd.read_csv(file.file)
    data_summary = df.describe().to_string()

    # 2️⃣ AI prompt
    prompt = f"""
You are a sales analyst.

Analyze the following sales dataset summary and write a short professional executive summary.

{data_summary}
"""

    # 3️⃣ Call Gemini AI
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    summary = response.text

    # 4️⃣ Send email
    send_email(email, summary)

    # 5️⃣ Return response in Swagger
    return {"summary": summary, "email": email, "note": "Email sent successfully!"}