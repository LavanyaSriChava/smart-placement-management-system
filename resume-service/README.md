# 🚀 GenAI Resume Analyzer Microservice

## Overview

GenAI Resume Analyzer is a FastAPI-based microservice that analyzes resumes against job descriptions and provides intelligent feedback to improve ATS (Applicant Tracking System) compatibility.

The system combines NLP techniques for resume-job matching with Generative AI to generate personalized suggestions and identify missing technical skills.

---

## Features

### 📄 Resume Parsing

* Upload PDF or DOCX resumes
* Extract resume text automatically

### 🎯  Matching Score

* Compare resume content with a job description
* Generate a matching score based on skill and keyword alignment

### 🚀 Skill Boosters

* Identify technical skills present in the job description but missing from the resume
* Highlight areas that can improve ATS compatibility

### 🤖 AI-Powered Suggestions

* Generate personalized recommendations using Groq LLM
* Suggest projects, certifications, and resume improvements

---

## Architecture

```text
Frontend
    │
    ▼
FastAPI Backend
    │
    ├── NLP Scoring Engine
    │      ├─ Skill Extraction
    │      ├─ Resume Matching
    │      └─ ATS Score
    │
    └── GenAI Service (Groq)
           └─ Resume Suggestions

    ▼
Analysis Results
```

---

## Technology Stack

### Backend

* FastAPI
* Uvicorn

### NLP & Machine Learning

* NLTK
* Sentence Transformers
* Text PreProcessing
  
### Generative AI

* Groq API
* Llama 3.3 70B Versatile

### File Processing

* PDFPlumber
* Python DOCX

---

## API Endpoints

### Upload Resume

```http
POST /upload_resume
```

Upload a PDF or DOCX resume and extract text.

Response:

```json
{
  "resume_text": "Extracted resume content..."
}
```

---

### Analyze Resume

```http
POST /analyze
```

Request:

```json
{
  "resume_text": "...",
  "job_description": "..."
}
```

Response:

```json
{
  "matching_score": 78,
  "assessment": "👍 Interview Worthy",
  "suggestions": "AI-generated resume improvement suggestions"
}
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

---

## Future Enhancements

* Resume Ranking System
* Multi-Resume Comparison
* Job Recommendation Engine
* AI-Based Resume Rewriting
* Interview Question Generation
* Analytics Dashboard

---

## Key Highlights

* FastAPI-based Microservice Architecture
* ATS Resume Scoring
* Skill Gap Analysis
* AI-Powered Resume Feedback
* Groq LLM Integration
* NLP-Based Resume Matching

---

## Authors

Developed as a GenAI-powered Resume Analyzer using FastAPI, NLP, and Large Language Models.
