from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyze import router as analyze_router
from app.routes.upload import router as upload_router
from app.routes.report import router as report_router
from app.routes.history import router as history_router
from app.database import engine, Base
from app.models.analysis import ResumeAnalysis

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Career Copilot",
    version="1.0.0",
    description="Generative AI agent to analyze resumes against job descriptions",
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(upload_router)
app.include_router(report_router)
app.include_router(history_router)


@app.get("/")
def root():
    return {"status": "Backend running successfully"}

