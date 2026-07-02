import json

from sqlalchemy.orm import Session

from app.models.analysis import ResumeAnalysis


def save_analysis(
    db: Session,
    resume: str,
    job_description: str,
    result: dict,
):

    analysis = ResumeAnalysis(

        resume=resume,

        job_description=job_description,

        strengths=json.dumps(result["strengths"]),

        weaknesses=json.dumps(result["weaknesses"]),

        matched_skills=json.dumps(result["matched_skills"]),

        missing_skills=json.dumps(result["missing_skills"]),

        recommendations=json.dumps(result["recommendations"]),

        analytics=json.dumps(result["analytics"]),

        match_score=result["match_score"]

    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis


def get_all_analyses(db: Session):

    return (
        db.query(ResumeAnalysis)
        .order_by(ResumeAnalysis.created_at.desc())
        .all()
    )


def get_analysis(db: Session, analysis_id: int):

    return (
        db.query(ResumeAnalysis)
        .filter(
            ResumeAnalysis.id == analysis_id
        )
        .first()
    )


def get_latest_analysis(db: Session):

    return (
        db.query(ResumeAnalysis)
        .order_by(ResumeAnalysis.id.desc())
        .first()
    )

def delete_analysis(db: Session, analysis_id: int):

    analysis = (
        db.query(ResumeAnalysis)
        .filter(ResumeAnalysis.id == analysis_id)
        .first()
    )

    if analysis is None:
        return False

    db.delete(analysis)

    db.commit()
    return True
    
        

    

