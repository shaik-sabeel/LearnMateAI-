import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def generate_roadmap(topic: str):
    """
    Generates a structured learning roadmap using Gemini API.
    """
    try:
        # Use simple model for text-to-json mapping
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        Generate a professional, detailed learning roadmap for "{topic}".
        Divide the roadmap into 4 distinct phases logically.
        
        Return ONLY a JSON array in this exact format:
        [
          {{
            "phase": "Phase 1: Title",
            "duration": "2 Weeks",
            "topics": ["Topic A", "Topic B", "Topic C"],
            "description": "Brief overview of what will be learned here.",
            "resources": ["Search Query 1", "Resource Type 2"]
          }}
        ]
        No markdown formatting (no ```json). No extra text.
        """
        
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Cleanup potential markdown if Gemini adds it anyway
        if text.startsWith('```json'):
            text = text.replace('```json', '').replace('```', '').strip()
        elif text.startsWith('```'):
            text = text.replace('```', '').strip()
            
        return json.loads(text)
    except Exception as e:
        print(f"Roadmap Generation Error: {e}")
        # Return fallback roadmap if AI fails
        return [
            {
                "phase": "Phase 1: Foundations",
                "duration": "1 Week",
                "topics": [f"Introduction to {topic}", "Core Concepts", "Environment Setup"],
                "description": "Start with the basics and get the tools ready.",
                "resources": [f"How to learn {topic} for beginners", "Best tools for {topic}"]
            },
            {
                "phase": "Phase 2: Core Mastery",
                "duration": "2 Weeks",
                "topics": ["Intermediate Techniques", "Practical Projects", "Common Patterns"],
                "description": "Dive deeper into the subject matter with hands-on practice.",
                "resources": [f"{topic} projects for students", f"Intermediate {topic} guide"]
            }
        ]
