import os
import requests
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

def fetch_youtube_videos(topic, max_results=5):
    if not YOUTUBE_API_KEY:
        print("Warning: YOUTUBE_API_KEY not found in .env")
        return []

    params = {
        'part': 'snippet',
        'q': topic,
        'key': YOUTUBE_API_KEY,
        'maxResults': max_results,
        'type': 'video'
    }

    try:
        response = requests.get(YOUTUBE_SEARCH_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        videos = []
        for item in data.get('items', []):
            video = {
                'title': item['snippet']['title'],
                'channel': item['snippet']['channelTitle'],
                'url': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                'type': 'YouTube',
                'is_paid': 'Free',
                'thumbnail': item['snippet']['thumbnails']['high']['url']
            }
            videos.append(video)
            
        return videos
    except requests.exceptions.RequestException as e:
        print(f"Error fetching YouTube videos: {e}")
        return []
