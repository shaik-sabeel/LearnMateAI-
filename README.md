# LearnMate AI++ – AI-Powered Personalized Learning Companion

## 🚀 Project Overview
**LearnMate AI++** is a next-generation educational platform that combines **Generative AI** and **Machine Learning** to create a personalized tutor for every student. It features a stunning, premium dark-mode UI and a microservices architecture.

## ✨ Key Features

### 1. 🔐 Secure Authentication Module
- **JWT-Based Auth**: Secure, stateless authentication using JSON Web Tokens.
- **Bcrypt Encryption**: Passwords are hashed before storage for maximum security.
- **Glassmorphism UI**: Beautiful, animated Login and Registration pages.

### 2. 🧠 AI-Powered Student Dashboard
- **Smart Resource Search**: Search for any topic (e.g., "React Hooks").
- **ML Recommendation Engine**:
  - **Tech**: Python (FastAPI + Scikit-learn).
  - **Algorithm**: TF-IDF (Term Frequency-Inverse Document Frequency) & Cosine Similarity.
  - **Function**: Recommends the most relevant learning resources based on your search query.
- **Resource Filtering**: Filter content by difficulty (Beginner/Advanced) and type (Video/Article).

### 3. 🤖 AI Tutor (Gemini Integration)
- **24/7 Personal Tutor**: Chat with a fine-tuned AI assistant (Gemini Pro).
- **Persistent Memory**: Chat history is stored in **MongoDB**, allowing the AI to maintain context.
- **Rich UI**: Modern chat interface with avatars, typing indicators, and message bubbles.

### 4. 📝 Dynamic Quiz Generator
- **Instantly Generated**: Creates 5 unique Multiple Choice Questions (MCQs) on *any* topic in seconds.
- **Adaptive Difficulty**: Choose between Beginner, Intermediate, and Advanced levels.
- **Real-time Scoring**: Immediate feedback on your answers.

### 5. 📊 Learning Gap Analytics
- **Skill Prediction**:
  - **Tech**: Python ML Service.
  - **Function**: Analyzes your quiz performance (Score vs. Difficulty).
  - **Output**: Predicts your current skill level (e.g., *"You are at an Intermediate level"*).
- **Visual Feedback**: Beautiful gradient cards displaying your analysis results.

### 6. 🎨 Premium UI/UX
- **Modern Tech Stack**: React + Vite + Tailwind CSS v4.
- **Aesthetic**:
  - **Dark Mode**: Deep midnight blue/violet theme.
  - **Glassmorphism**: Translucent cards with background blurs.
  - **Animations**: Smooth transitions, floating elements, and glow effects.
- **Responsive**: Fully optimized for desktop and mobile.

## 🛠️ Technical Architecture
- **Frontend**: React, TailwindCSS, ShadCN UI
- **Backend**: Node.js, Express, MongoDB
- **ML Microservice**: Python, FastAPI, Scikit-learn
- **AI Model**: Google Gemini Pro

## 🏃‍♂️ Quick Start
1. **Backend**: `cd backend && npm start` (Port 5000)
2. **ML Service**: `cd ml-service && uvicorn main:app --reload` (Port 8000)
3. **Frontend**: `cd frontend && npm run dev` (Port 5173)
