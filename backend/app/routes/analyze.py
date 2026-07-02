from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.models.request import ResumeAnalyzeRequest
from app.agents.resume_agent import resume_agent
from app.database import get_db
from app.crud import save_analysis

router = APIRouter(
    prefix="/analyze",
    tags=["Resume Analysis"]
)


@router.post("/")
def analyze_resume(
    payload: ResumeAnalyzeRequest,
    db: Session = Depends(get_db)
):
    try:

        result = resume_agent.run_sync(
            f"""
Resume:

{payload.resume}

Job Description:

{payload.job_description}
"""
        )

        analysis = save_analysis(
            db=db,
            resume=payload.resume,
            job_description=payload.job_description,
            result=result.data
        )

        return {
            "success": True,
            "analysis_id": analysis.id,
            "data": result.data
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

        
