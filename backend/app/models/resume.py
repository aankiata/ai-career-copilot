from pydantic import BaseModel, Field
from typing import List

class ResumeAnalysis(BaseModel):
    strengths: List[str] = Field(
        description="Strong points of the candidate based on resume"
    )
    weaknesses: List[str] = Field(
        description="Weak areas or gaps in the resume"
    )
    missing_skills: List[str] = Field(
        description="Skills missing compared to the job description"
    )
    match_score: int = Field(
        ge=0, le=100,
        description="Resume match score out of 100"
    )
