import os
import tempfile

from fastapi import APIRouter, UploadFile, File

from app.services.pdf_parser import extract_text_from_pdf

router = APIRouter(
    prefix="/upload",
    tags=["Resume Upload"]
)


@router.post("/")
async def upload_resume(file: UploadFile = File(...)):

    # Allow only PDF files
    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Only PDF files are allowed."
        }

    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:

        contents = await file.read()

        temp.write(contents)

        temp_path = temp.name

    try:

        extracted_text = extract_text_from_pdf(temp_path)

        return {
            "success": True,
            "filename": file.filename,
            "resume_text": extracted_text
        }

    finally:

        os.remove(temp_path)
        