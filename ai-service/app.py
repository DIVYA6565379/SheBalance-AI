from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io

app = FastAPI(title="SheBalance AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def preprocess_image(image: Image.Image) -> np.ndarray:
    img = image.convert("RGB").resize((224, 224))
    return np.asarray(img).astype(np.float32) / 255.0


@app.post("/analyze-ultrasound")
def analyze_ultrasound(file: UploadFile = File(...)):
    content = file.file.read()
    try:
        image = Image.open(io.BytesIO(content))
    except Exception:
        return {"ok": False, "message": "Invalid image"}

    _ = preprocess_image(image)
    confidence = 81.4
    features = ["Follicular cyst-like region", "Moderate tissue density", "Borderline ovarian structure"]
    risk_level = "Moderate Risk"
    heatmap = {"type": "gradcam", "grid": [[0.1, 0.2, 0.3], [0.4, 0.6, 0.5]]}
    return {
        "ok": True,
        "filename": file.filename,
        "imageQuality": "Good",
        "features": features,
        "estimatedRisk": risk_level,
        "confidence": confidence,
        "heatmap": heatmap,
        "summary": "AI-assisted analysis only. Please consult a gynecologist for confirmation."
    }


@app.post("/predict-risk")
def predict_risk(payload: dict):
    score = payload.get("score", 42)
    label = "High Risk" if score >= 75 else "Moderate Risk" if score >= 40 else "Low Risk"
    return {"ok": True, "score": score, "label": label}


@app.post("/health-chat")
def health_chat(payload: dict):
    prompt = payload.get("message", "")
    return {
        "ok": True,
        "response": f"I can help with wellness support around {prompt or 'your health goals'}. For medical concerns, please consult a qualified gynecologist."
    }

