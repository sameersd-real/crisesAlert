from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Incident(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_incident(data: Incident):

    prompt = f"""
Analyze this emergency incident:

{data.text}

Return ONLY valid JSON in this format:

{{
  "type": "",
  "severity": "",
  "summary": "",
  "action": "",
  "steps": [
    "",
    "",
    ""
  ]
}}
"""
    response = model.generate_content(prompt)

    return {
        "result": response.text
    }