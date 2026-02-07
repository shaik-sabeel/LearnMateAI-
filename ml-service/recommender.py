import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    # Load merged dataset
    df = pd.read_csv('merged_courses.csv')
    
    # Initialize TF-IDF
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['content'].fillna(''))
    
except FileNotFoundError:
    print("Warning: merged_courses.csv not found. Recommender will return empty.")
    df = pd.DataFrame()
    tfidf_matrix = None

def get_paid_recommendations(topic, top_k=5):
    if df.empty or tfidf_matrix is None:
        return []
        
    try:
        query_vec = tfidf.transform([topic.lower()])
        cosine_sim = cosine_similarity(query_vec, tfidf_matrix).flatten()
        
        # Get top k indices
        indices = cosine_sim.argsort()[-top_k:][::-1]
        
        results = []
        for i in indices:
            if cosine_sim[i] > 0.0:
                course = df.iloc[i]
                results.append({
                    'title': str(course['title']),
                    'level': str(course['level']),
                    'url': str(course['url']),
                    'price': float(course['price']) if pd.notnull(course['price']) else 0.0,
                    'is_paid': str(course['is_paid']),
                    'relevance_score': float(cosine_sim[i])
                })
                
        return results
    except Exception as e:
        print(f"Error in recommendation: {e}")
        return []
