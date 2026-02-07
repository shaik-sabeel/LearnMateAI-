import pandas as pd
import re

def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

def merge_datasets():
    print("Starting dataset merge...")
    try:
        # Load Datasets
        udemy_df = pd.read_csv('udemy_online_education_courses_dataset.csv')
        coursera_df = pd.read_csv('coursera_course_dataset_v2_no_null.csv')
        
        # 1. Process Udemy
        # Expected cols: course_id,course_title,url,is_paid,price,num_subscribers,num_reviews,num_lectures,level,content_duration,published_timestamp,subject
        udemy_processed = udemy_df[['course_title', 'url', 'is_paid', 'price', 'level', 'subject']].copy()
        udemy_processed.rename(columns={'course_title': 'title'}, inplace=True)
        udemy_processed['platform'] = 'Udemy'
        # Create content for TF-IDF: title + level + subject
        udemy_processed['content'] = (
            udemy_processed['title'].apply(clean_text) + " " + 
            udemy_processed['level'].apply(clean_text) + " " + 
            udemy_processed['subject'].apply(clean_text)
        )

        # 2. Process Coursera
        # Expected cols: ,Title,Organization,Skills,Ratings,Review counts,Metadata
        coursera_processed = coursera_df[['Title', 'Organization', 'Skills']].copy()
        coursera_processed.rename(columns={'Title': 'title'}, inplace=True)
        
        # Construct Search URL since direct link is missing
        coursera_processed['url'] = coursera_processed['title'].apply(
            lambda x: f"https://www.coursera.org/search?query={str(x).replace(' ', '%20')}"
        )
        coursera_processed['is_paid'] = 'Coursera'
        coursera_processed['price'] = 0.0
        coursera_processed['level'] = 'All Levels'
        coursera_processed['platform'] = 'Coursera'
        
        # Create content for TF-IDF: title + org + skills
        coursera_processed['content'] = (
            coursera_processed['title'].apply(clean_text) + " " + 
            coursera_processed['Organization'].apply(clean_text) + " " + 
            coursera_processed['Skills'].apply(clean_text)
        )
        
        # 3. Merge
        # Select common columns
        cols = ['title', 'url', 'is_paid', 'price', 'level', 'platform', 'content']
        udemy_final = udemy_processed[cols]
        coursera_final = coursera_processed[cols]
        
        merged_df = pd.concat([udemy_final, coursera_final], ignore_index=True)
        
        # Fill NaNs
        merged_df['price'] = merged_df['price'].fillna(0.0)
        merged_df['is_paid'] = merged_df['is_paid'].fillna('Free')
        merged_df['content'] = merged_df['content'].fillna('')
        
        # Save
        merged_df.to_csv('merged_courses.csv', index=False)
        print(f"Successfully merged {len(udemy_final)} Udemy courses and {len(coursera_final)} Coursera courses.")
        print(f"Total rows: {len(merged_df)}")
        print("Saved to merged_courses.csv")
        
    except FileNotFoundError as e:
        print(f"Error: Could not find dataset files. {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    merge_datasets()
