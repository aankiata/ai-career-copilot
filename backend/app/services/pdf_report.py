import os
import tempfile

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from reportlab.lib.units import inch


def create_pdf_report(result: dict) -> str:
    """
    Generates a professional AI Resume Report PDF.

    Returns:
        Path to generated PDF.
    """

    temp_pdf = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    pdf_path = temp_pdf.name

    temp_pdf.close()

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    title_style = styles["Heading1"]
    heading_style = styles["Heading2"]
    normal_style = styles["BodyText"]

    # ----------------------------
    # Title
    # ----------------------------

    story.append(
        Paragraph(
            "<font color='darkblue'><b>AI Career Copilot Report</b></font>",
            title_style,
        )
    )

    story.append(Spacer(1, 0.3 * inch))

    # ----------------------------
    # ATS Score
    # ----------------------------

    story.append(
        Paragraph(
            f"<b>ATS Match Score:</b> {result['match_score']}%",
            heading_style,
        )
    )

    story.append(Spacer(1, 0.25 * inch))

    # ----------------------------
    # Resume Analytics
    # ----------------------------

    story.append(
        Paragraph(
            "<b>Resume Analytics</b>",
            heading_style,
        )
    )

    analytics = result["analytics"]

    for key, value in analytics.items():

        story.append(
            Paragraph(
                f"{key.replace('_',' ').title()}: {value}%",
                normal_style,
            )
        )

    story.append(Spacer(1, 0.3 * inch))

    # ----------------------------
    # Strengths
    # ----------------------------

    story.append(
        Paragraph("<b>Strengths</b>", heading_style)
    )

    for item in result["strengths"]:
        story.append(
            Paragraph(f"• {item}", normal_style)
        )

    story.append(Spacer(1, 0.2 * inch))

    # ----------------------------
    # Weaknesses
    # ----------------------------

    story.append(
        Paragraph("<b>Weaknesses</b>", heading_style)
    )

    for item in result["weaknesses"]:
        story.append(
            Paragraph(f"• {item}", normal_style)
        )

    story.append(Spacer(1, 0.2 * inch))

    # ----------------------------
    # Matched Skills
    # ----------------------------

    story.append(
        Paragraph("<b>Matched Skills</b>", heading_style)
    )

    story.append(
        Paragraph(
            ", ".join(result["matched_skills"]),
            normal_style,
        )
    )

    story.append(Spacer(1, 0.2 * inch))

    # ----------------------------
    # Missing Skills
    # ----------------------------

    story.append(
        Paragraph("<b>Missing Skills</b>", heading_style)
    )

    story.append(
        Paragraph(
            ", ".join(result["missing_skills"]),
            normal_style,
        )
    )

    story.append(Spacer(1, 0.2 * inch))

    # ----------------------------
    # Recommendations
    # ----------------------------

    story.append(
        Paragraph("<b>Recommendations</b>", heading_style)
    )

    for item in result["recommendations"]:
        story.append(
            Paragraph(f"• {item}", normal_style)
        )

    doc.build(story)

    return pdf_path

    