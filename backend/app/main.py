from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyze import router as analyze_router
from app.routes.upload import router as upload_router
from app.routes.report import router as report_router
from app.routes.history import router as history_router

from app.database import engine, Base
from app.models.analysis import ResumeAnalysis

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Career Copilot",
    version="1.0.0",
    description="Generative AI agent to analyze resumes against job descriptions",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze_router)
app.include_router(upload_router)
app.include_router(report_router)
app.include_router(history_router)


@app.get("/")
def root():
    return {
        "status": "Backend running successfully",
        "service": "AI Career Copilot API",
        "docs": "/docs",
    }
