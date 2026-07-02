from pydantic import BaseModel, Field

class ResumeAnalyzeRequest(BaseModel):
    resume: str = Field(..., min_length=20)
    job_description: str = Field(..., min_length=20)
