from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()
APIKEY = os.getenv("GCP_API_KEY")

client = genai.Client(api_key = APIKEY) #hide key later

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

    try:

        response = client.models.generate_content(
            model="models/gemini-2.0-flash-lite",
            contents=f"""
Analyze this emergency incident:

{data.text}

Return ONLY valid JSON in this format:

{{
  "type": "",
  "severity": "",
  "location":"",
  "summary": "",
  "action": "",
  "steps": [
    "",
    "",
    ""
  ]
}}
Return raw JSON only.
"""
        )

        return {
            "result": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }