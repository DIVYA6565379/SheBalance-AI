# SheBalance – AI Powered PCOD Early Risk Assessment Platform

SheBalance helps users assess early risk for PCOD, get personalized recommendations, analyze medical images via an AI microservice, and generate PDF reports.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Axios, Framer Motion, Chart.js, React Hook Form, React Icons
- Backend: Node.js + Express, MongoDB + Mongoose, JWT Auth, Bcrypt, Multer, PDFKit, Nodemailer
- AI Service: Python (FastAPI/Flask), TensorFlow/PyTorch placeholders, OpenCV, Pillow, NumPy

## Local Development
### 1) Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB (local) or use docker-compose

### 2) Environment Variables
Each service includes an `.env.example` file. Copy to `.env`.

### 3) Run Services
Open 3 terminals:

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
npm install
npm start
```

**AI Service**
```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

### 4) MongoDB
If you prefer docker:
```bash
docker-compose up -d
```

## Project Structure
- `frontend/` – React app
- `backend/` – Express API
- `ai-service/` – Python AI microservice

## Next Steps
See `TODO.md` for the staged implementation plan.

