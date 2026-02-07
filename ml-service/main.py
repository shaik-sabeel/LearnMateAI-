from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ResourceRequest(BaseModel):
    topic: str

class GapPredictionRequest(BaseModel):
    quiz_score: int
    total_questions: int

@app.get("/")
def read_root():
    return {"message": "LearnMate AI++ ML Service Running"}

from recommender import get_paid_recommendations
from youtube_fetcher import fetch_youtube_videos
from predictor import predict_level

@app.post("/ml/recommend")
def recommend_resources(request: ResourceRequest):
    paid_courses = get_paid_recommendations(request.topic)
    free_videos = fetch_youtube_videos(request.topic)
    
    return {
        "topic": request.topic,
        "paid_courses": paid_courses,
        "free_youtube_resources": free_videos,
        # Keep legacy field for compatibility if frontend expects flat list initially
        "recommendations": paid_courses + free_videos 
    }

@app.post("/ml/predict-gap")
def predict_gap(request: GapPredictionRequest):
    level = predict_level(request.quiz_score, request.total_questions)
    return {"level": level}
