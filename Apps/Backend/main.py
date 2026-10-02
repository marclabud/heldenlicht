from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from agent_service import run_mock_agent
from models import ExampleAIResponse

app = FastAPI(
    title="agent-nuxt4-tw4-blueprint API",
    description="A starter backend skeleton featuring FastAPI and Google ADK 2.0.",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the agent-nuxt4-tw4-blueprint FastAPI Backend!",
        "docs_url": "/docs"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }

@app.post("/agent/run", response_model=ExampleAIResponse)
async def run_agent_endpoint(input_data: dict):
    """
    Triggers agent inference for generic input data.
    """
    try:
        response = await run_mock_agent(input_data)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent Inference Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
