# LearnMate AI++ – AI-Powered Personalized Learning Companion

## 🚀 Project Overview
**LearnMate AI++** is a next-generation educational platform that combines **Generative AI** and **Machine Learning** to create a personalized tutor for every student. It features a stunning, premium dark-mode UI and a microservices architecture designed to provide an immersive, adaptive learning experience.

The platform integrates cutting-edge technologies to offer personalized learning paths, real-time AI tutoring, dynamic quiz generation, and intelligent resource recommendations, all wrapped in a beautiful, responsive interface.

## ✨ Key Features

### 1. 🔐 Secure Authentication Module
- **JWT-Based Auth**: Secure, stateless authentication using JSON Web Tokens.
- **Bcrypt Encryption**: Passwords are hashed before storage for maximum security.
- **Glassmorphism UI**: Beautiful, animated Login and Registration pages with smooth transitions.

### 2. 🧠 AI-Powered Student Dashboard
- **Smart Resource Search**: Search for any topic (e.g., "React Hooks") and get instant recommendations.
- **ML Recommendation Engine**:
  - **Tech**: Python (FastAPI + Scikit-learn).
  - **Algorithm**: TF-IDF (Term Frequency-Inverse Document Frequency) & Cosine Similarity.
  - **Function**: Recommends the most relevant learning resources based on your search query from curated datasets.
- **Resource Filtering**: Filter content by difficulty (Beginner/Advanced) and type (Video/Article/Course).

### 3. 🤖 AI Tutor (Gemini Integration)
- **24/7 Personal Tutor**: Chat with a fine-tuned AI assistant powered by Google Gemini Pro.
- **Persistent Memory**: Chat history is stored in **MongoDB**, allowing the AI to maintain context across sessions.
- **Rich UI**: Modern chat interface with avatars, typing indicators, message bubbles, and markdown support.

### 4. 📝 Dynamic Quiz Generator
- **Instantly Generated**: Creates 5 unique Multiple Choice Questions (MCQs) on *any* topic in seconds using AI.
- **Adaptive Difficulty**: Choose between Beginner, Intermediate, and Advanced levels.
- **Real-time Scoring**: Immediate feedback on your answers with explanations.

### 5. 📊 Learning Gap Analytics
- **Skill Prediction**:
  - **Tech**: Python ML Service.
  - **Function**: Analyzes your quiz performance (Score vs. Difficulty) using predictive models.
  - **Output**: Predicts your current skill level (e.g., *"You are at an Intermediate level"*).
- **Visual Feedback**: Beautiful gradient cards displaying your analysis results and progress tracking.

### 6. 🎨 Premium UI/UX
- **Modern Tech Stack**: React + Vite + Tailwind CSS v4 + ShadCN UI components.
- **Aesthetic**:
  - **Dark Mode**: Deep midnight blue/violet theme with customizable themes.
  - **Glassmorphism**: Translucent cards with background blurs and glow effects.
  - **Animations**: Smooth transitions, floating elements, and interactive animations using GSAP and Three.js.
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices.

### 7. 📈 Additional Features
- **Roadmap Generation**: AI-generated learning roadmaps for any topic.
- **Resume Analyzer**: Upload and analyze resumes for career guidance.
- **Mock Interviews**: Practice interviews with AI-generated questions.
- **Leaderboard**: Compete with other learners and track achievements.
- **Payment Integration**: Stripe-powered subscription plans for premium features.

## 🛠️ Technical Architecture

### Microservices Design
- **Frontend Service**: React-based SPA with Vite for fast development.
- **Backend Service**: Node.js/Express API server handling authentication, data management, and AI integrations.
- **ML Service**: Python/FastAPI microservice for machine learning tasks (recommendations, predictions, roadmaps).

### Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, ShadCN UI, React Router, Axios, GSAP, Three.js
- **Backend**: Node.js, Express.js, MongoDB, JWT, Bcrypt, Stripe, Google Generative AI
- **ML Service**: Python, FastAPI, Uvicorn, Scikit-learn, Pandas, NumPy
- **Database**: MongoDB (with Mongoose ODM)
- **AI/ML**: Google Gemini Pro, Custom ML models for recommendations and predictions

### Project Structure
```
LearnMate AI++/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware (auth, etc.)
│   │   └── authMiddleware.js
│   ├── models/             # MongoDB schemas
│   │   ├── ChatHistory.js
│   │   ├── QuizResult.js
│   │   ├── Resource.js
│   │   └── User.js
│   ├── routes/             # API route definitions
│   │   ├── achievement.js
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── interview.js
│   │   ├── payment.js
│   │   ├── quiz.js
│   │   ├── resources.js
│   │   ├── resume.js
│   │   └── roadmap.js
│   ├── server.js           # Main server file
│   ├── test_interview.js
│   ├── test_models.js
│   └── package.json
├── frontend/                # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── LiveBackground.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ui/         # ShadCN UI components
│   │   ├── pages/          # Page components
│   │   │   ├── Chat.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MockInterview.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResumeAnalyzer.jsx
│   │   │   └── Roadmap.jsx
│   │   ├── services/       # API service functions
│   │   │   └── api.js
│   │   └── lib/            # Utility functions
│   │       └── utils.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── package.json
├── ml-service/              # Python ML microservice
│   ├── main.py             # FastAPI app
│   ├── recommender.py      # Recommendation engine
│   ├── predictor.py        # Skill prediction model
│   ├── roadmap.py          # Roadmap generation
│   ├── youtube_fetcher.py  # YouTube video fetching
│   ├── dataset_cleaner.py
│   ├── dataset_merger.ipynb
│   ├── merge_datasets.py
│   ├── cleaned_courses.csv
│   ├── coursera_course_dataset_v2_no_null.csv
│   ├── courses.csv
│   ├── merged_courses.csv
│   ├── udemy_online_education_courses_dataset.csv
│   ├── requirements.txt
│   └── __pycache__/
└── README.md
```

## � Database Schemas

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now),
  xp: Number (default: 0),
  level: Number (default: 1),
  badges: [{
    title: String,
    icon: String,
    dateEarned: Date
  }],
  credits: Number (default: 5),
  streak: Number (default: 0),
  lastLogin: Date,
  isPro: Boolean (default: false)
}
```

### ChatHistory Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  role: String (enum: ['user', 'model'], required),
  message: String (required),
  timestamp: Date (default: now)
}
```

### QuizResult Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  topic: String (required),
  difficulty: String (required),
  score: Number (required),
  totalQuestions: Number (required),
  answers: [String],
  timestamp: Date (default: now)
}
```

## 🤖 AI & ML Models

### Gemini AI Integration
- **Model**: Google Gemini Pro (gemini-flash-latest)
- **Usage**: Chat tutoring, quiz generation, roadmap creation
- **Features**:
  - Context-aware conversations
  - Code generation and explanation
  - Structured JSON responses for quizzes and roadmaps

### Recommendation Engine
- **Algorithm**: TF-IDF Vectorization + Cosine Similarity
- **Dataset**: Merged courses from Coursera, Udemy, and YouTube
- **Features**:
  - Content-based filtering
  - Relevance scoring
  - Paid/Free resource separation

### Skill Prediction Model
- **Logic**: Percentage-based classification
  - 80%+ = Advanced
  - 50-79% = Intermediate
  - <50% = Beginner
- **Input**: Quiz score and total questions
- **Output**: Predicted skill level

## 📱 Frontend Pages Overview

### Core Pages
- **Home**: Landing page with hero section and feature highlights
- **Login/Register**: Authentication with glassmorphism design
- **Dashboard**: Main hub with quick access to all features
- **Chat**: AI tutor interface with persistent chat history
- **Quiz**: Dynamic quiz generation and scoring
- **Roadmap**: AI-generated learning paths

### Additional Pages
- **Onboarding**: User setup and preferences
- **Leaderboard**: Gamification and competition
- **Pricing**: Subscription plans and payment
- **PublicProfile**: User profiles and achievements
- **MockInterview**: Interview practice sessions
- **ResumeAnalyzer**: CV analysis and suggestions

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://python.org/)
- **MongoDB** (local or cloud instance) - [Download](https://mongodb.com/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/learnmate-ai-plusplus.git
cd learnmate-ai-plusplus
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnmate
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. ML Service Setup
```bash
cd ../ml-service
pip install -r requirements.txt
```

Create a `.env` file in the `ml-service` directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

## 🏃‍♂️ Running the Application

### Development Mode
1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm run dev  # Uses nodemon for auto-restart
   ```
   Server will run on `http://localhost:5000`

3. **Start ML Service**:
   ```bash
   cd ml-service
   uvicorn main:app --reload
   ```
   Service will run on `http://localhost:8000`

4. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   App will run on `http://localhost:5173`

### Production Build
```bash
# Frontend build
cd frontend
npm run build

# Backend production start
cd ../backend
npm start
```

## 📚 API Documentation

### Backend Endpoints

#### Authentication Routes (`/api/auth`)
- `POST /api/auth/register`
  - **Body**: `{ name, email, password }`
  - **Response**: `{ token }`
  - **Description**: Register a new user account

- `POST /api/auth/login`
  - **Body**: `{ email, password }`
  - **Response**: `{ token }`
  - **Description**: Authenticate user and return JWT token

#### Chat Routes (`/api/chat`)
- `POST /api/chat`
  - **Auth**: Required (JWT)
  - **Body**: `{ message }`
  - **Response**: `{ response, chatId }`
  - **Description**: Send message to AI tutor and get response

- `GET /api/chat/history`
  - **Auth**: Required (JWT)
  - **Response**: `[ { role, message, timestamp } ]`
  - **Description**: Get user's chat history

#### Quiz Routes (`/api/quiz`)
- `POST /api/quiz/generate`
  - **Auth**: Required (JWT)
  - **Body**: `{ topic, difficulty }`
  - **Response**: `{ quiz: [ { question, options, answer } ] }`
  - **Description**: Generate 5 MCQs on specified topic

- `POST /api/quiz/submit`
  - **Auth**: Required (JWT)
  - **Body**: `{ topic, difficulty, score, totalQuestions, answers }`
  - **Response**: `{ message, level }`
  - **Description**: Submit quiz results and get skill prediction

#### Resources Routes (`/api/resources`)
- `GET /api/resources/search?query=topic`
  - **Auth**: Required (JWT)
  - **Response**: `{ recommendations: [ { title, url, type } ] }`
  - **Description**: Search for learning resources

#### Roadmap Routes (`/api/roadmap`)
- `POST /api/roadmap/generate`
  - **Auth**: Required (JWT)
  - **Body**: `{ topic }`
  - **Response**: `{ roadmap: [ { phase, duration, topics, description } ] }`
  - **Description**: Generate learning roadmap for topic

#### Achievement Routes (`/api/achievement`)
- `GET /api/achievement/badges`
  - **Auth**: Required (JWT)
  - **Response**: `[ { title, icon, dateEarned } ]`
  - **Description**: Get user's earned badges

#### Payment Routes (`/api/payment`)
- `POST /api/payment/create-session`
  - **Auth**: Required (JWT)
  - **Body**: `{ plan }`
  - **Response**: `{ sessionId, url }`
  - **Description**: Create Stripe checkout session

### ML Service Endpoints
- `POST /ml/recommend`
  - **Body**: `{ topic }`
  - **Response**: `{ topic, paid_courses, free_youtube_resources }`
  - **Description**: Get ML-powered resource recommendations

- `POST /ml/roadmap`
  - **Body**: `{ topic }`
  - **Response**: `{ topic, roadmap }`
  - **Description**: Generate structured learning roadmap

- `POST /ml/predict-gap`
  - **Body**: `{ quiz_score, total_questions }`
  - **Response**: `{ level }`
  - **Description**: Predict user's skill level

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnmate
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

#### ML Service (.env)
```env
GEMINI_API_KEY=your_gemini_api_key
```

### API Keys Setup
1. **Google Gemini API**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to both backend and ml-service `.env` files

2. **Stripe (for payments)**:
   - Create account at [Stripe](https://stripe.com)
   - Get publishable and secret keys
   - Add to backend `.env` file

## 🚀 Deployment

### Backend Deployment (Railway/Vercel)
```bash
# Build and deploy
npm run build
# Use platform-specific deployment commands
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder to hosting platform
```

### ML Service Deployment (Railway/Render)
```bash
# Use Docker or platform-specific Python deployment
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Docker Setup (Optional)
```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Backend Tests
```bash
cd backend
npm test  # If test scripts are added
```

### ML Service Tests
```bash
cd ml-service
python -m pytest  # If pytest is configured
```

### Manual Testing
- Use Postman for API testing
- Test all authentication flows
- Verify AI responses and ML recommendations

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or update connection string
   - Check network connectivity for cloud MongoDB

2. **Gemini API Errors**
   - Verify API key is valid and has quota
   - Check API key permissions

3. **CORS Issues**
   - Ensure backend allows frontend origin
   - Check CORS middleware configuration

4. **ML Service Not Responding**
   - Verify Python dependencies are installed
   - Check FastAPI server logs
   - Ensure port 8000 is available

5. **Frontend Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Debug Mode
```bash
# Backend debug
cd backend
npm run dev

# ML service debug
cd ml-service
uvicorn main:app --reload --log-level debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint rules for frontend code
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## �️ Future Roadmap

### Phase 1 (Current)
- ✅ Basic AI chat and quiz generation
- ✅ ML recommendations
- ✅ User authentication and profiles
- ✅ Responsive UI with dark theme

### Phase 2 (Upcoming)
- 🔄 Advanced ML models (collaborative filtering)
- 🔄 Video content analysis
- 🔄 Real-time collaboration features
- 🔄 Mobile app development
- 🔄 Advanced analytics dashboard

### Phase 3 (Future)
- 🔄 Multi-language support
- 🔄 Voice-based interactions
- 🔄 AR/VR learning experiences
- 🔄 Integration with learning management systems
- 🔄 Advanced gamification features

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **MongoDB** for database services
- **Stripe** for payment processing
- **FastAPI** and **Scikit-learn** for ML services
- **React** and **Tailwind CSS** communities
- **Open-source** contributors and libraries

## 📞 Support

For support, email support@learnmate.ai or join our Discord community.

---

**LearnMate AI++** - Empowering learners with AI-driven personalized education. 🌟

*Built with ❤️ using cutting-edge AI and modern web technologies*
