import pandas as pd
import re

def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

def clean_dataset(input_file='courses.csv', output_file='cleaned_courses.csv'):
    try:
        df = pd.read_csv(input_file)
        
        # Drop duplicates
        df.drop_duplicates(subset=['course_id'], inplace=True)
        
        # Fill missing
        df['course_title'] = df['course_title'].fillna('')
        df['level'] = df['level'].fillna('')
        
        # Create Content Column
        df['content'] = df['course_title'].apply(clean_text) + " " + df['level'].apply(clean_text)
        
        # Normalize columns
        df['is_paid'] = 'Paid'
        
        # Select relevant columns
        cleaned_df = df[['course_id', 'course_title', 'url', 'is_paid', 'price', 'level', 'content']]
        
        cleaned_df.to_csv(output_file, index=False)
        print(f"Dataset cleaned and saved to {output_file}")
        
    except FileNotFoundError:
        print(f"Error: {input_file} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    clean_dataset()
