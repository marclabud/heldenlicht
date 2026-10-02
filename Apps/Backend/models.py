from pydantic import BaseModel, Field

class ExampleAIResponse(BaseModel):
    summary: str = Field(..., description="A concise summary of the generated output.")
    insights: list[str] = Field(..., description="Key insights or bullets extracted by the AI.")
    confidence_score: float = Field(..., description="The model's confidence rating between 0.0 and 1.0.")


