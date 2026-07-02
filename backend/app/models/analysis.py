from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime

from app.database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume = Column(Text, nullable=False)

    job_description = Column(Text, nullable=False)

    strengths = Column(Text, nullable=False)

    weaknesses = Column(Text, nullable=False)

    matched_skills = Column(Text, nullable=False)

    missing_skills = Column(Text, nullable=False)

    recommendations = Column(Text, nullable=False)

    analytics = Column(Text, nullable=False)

    match_score = Column(Integer, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    