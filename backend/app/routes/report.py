from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.crud import get_latest_analysis
from app.services.pdf_report import create_pdf_report

router = APIRouter(
    prefix="/report",
    tags=["PDF Report"]
)


@router.get("/")
def download_report(db: Session = Depends(get_db)):

    analysis = get_latest_analysis(db)

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="No analysis found. Analyze a resume first."
        )

    result = {
        "strengths": json.loads(analysis.strengths),
        "weaknesses": json.loads(analysis.weaknesses),
        "matched_skills": json.loads(analysis.matched_skills),
        "missing_skills": json.loads(analysis.missing_skills),
        "recommendations": json.loads(analysis.recommendations),
        "analytics": json.loads(analysis.analytics),
        "match_score": analysis.match_score,
    }

    pdf_path = create_pdf_report(result)

    return FileResponse(
        path=pdf_path,
        filename="AI_Career_Report.pdf",
        media_type="application/pdf",
    )

    

    
    