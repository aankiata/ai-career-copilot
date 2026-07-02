# 🚀 AI Career Copilot

An AI-powered Career Copilot that analyzes resumes against job descriptions using **Google Gemini AI**, calculates an ATS compatibility score, identifies missing skills, generates actionable recommendations, stores analysis history, and creates downloadable PDF reports.

🌐 **Live Demo:** https://ai-career-copilot-wine-eight.vercel.app

🔗 **Backend API:** https://ai-career-backend-vqt9.onrender.com/docs

---

# ✨ Features

- 📄 Upload PDF Resume
- 🤖 AI Resume Analysis using Gemini AI
- 🎯 ATS Match Score
- 📊 Resume Analytics Dashboard
- 💪 Strengths & Weaknesses Detection
- ✅ Matched Skills Identification
- 📚 Missing Skills Detection
- 💡 AI Recommendations
- 📄 Download PDF Report
- 🕒 Analysis History
- 🔍 Search Previous Analyses
- 🗑 Delete Analysis
- ☁️ Cloud Deployment
- 🐳 Dockerized Application

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## Backend

- FastAPI
- SQLAlchemy
- Google Gemini AI
- PostgreSQL
- ReportLab
- PyMuPDF

## Cloud & DevOps

- Docker
- Docker Compose
- Render
- Vercel
- Neon PostgreSQL
- GitHub

---

# 🏗 Architecture

```
                React (Vercel)
                       │
                       ▼
               FastAPI (Render)
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
 Google Gemini AI         Neon PostgreSQL
```

---

# 📂 Project Structure

```
ai-career-copilot/

├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── database.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
```

---

# 🚀 Local Installation

## Clone Repository

```bash
git clone https://github.com/aankiata/ai-career-copilot.git
```

```bash
cd ai-career-copilot
```

---

## Start with Docker

```bash
docker compose up --build
```

---

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8000
```

Swagger Docs:

```
http://localhost:8000/docs
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/upload/` | Upload Resume |
| POST | `/analyze/` | Analyze Resume |
| GET | `/history/` | View Analysis History |
| DELETE | `/history/{id}` | Delete Analysis |
| GET | `/report/` | Download PDF Report |

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

---

# 🔮 Future Improvements

- JWT Authentication
- Resume Builder
- Cover Letter Generator
- Resume Comparison
- AI Career Chatbot
- Job Recommendation Engine
- Email Notifications
- GitHub Actions CI/CD

---

# 👩‍💻 Author

**Ankita Kumari**

GitHub:

https://github.com/aankiata

LinkedIn:

(Add your LinkedIn profile here)

