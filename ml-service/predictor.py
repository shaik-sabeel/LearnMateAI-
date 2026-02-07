def predict_level(score, total):
    if total == 0:
        return "Beginner"
    
    percentage = (score / total) * 100
    
    if percentage >= 80:
        return "Advanced"
    elif percentage >= 50:
        return "Intermediate"
    else:
        return "Beginner"
