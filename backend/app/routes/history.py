import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud import (
    get_all_analyses,
    get_analysis,
    delete_analysis,
)

router = APIRouter(
    prefix="/history",
    tags=["Analysis History"]
)


@router.get("/")
def history(db: Session = Depends(get_db)):

    analyses = get_all_analyses(db)

    history_list = []

    for analysis in analyses:

        history_list.append({

            "id": analysis.id,

            "match_score": analysis.match_score,

            "created_at": analysis.created_at,

            "matched_skills": json.loads(analysis.matched_skills),

            "missing_skills": json.loads(analysis.missing_skills)

        })

    return history_list


@router.get("/{analysis_id}")
def get_analysis_by_id(
    analysis_id: int,
    db: Session = Depends(get_db)
):

    analysis = get_analysis(db, analysis_id)

    if analysis is None:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )

    return {

        "id": analysis.id,

        "match_score": analysis.match_score,

        "strengths": json.loads(analysis.strengths),

        "weaknesses": json.loads(analysis.weaknesses),

        "matched_skills": json.loads(analysis.matched_skills),

        "missing_skills": json.loads(analysis.missing_skills),

        "recommendations": json.loads(analysis.recommendations),

        "analytics": json.loads(analysis.analytics),

        "created_at": analysis.created_at

    }

@router.delete("/{analysis_id}")
def remove_analysis(
    analysis_id: int,
    db: Session = Depends(get_db)
):

    deleted = delete_analysis(db, analysis_id)

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )

    return {
        "success": True,
        "message": "Analysis deleted successfully."
    }

    
