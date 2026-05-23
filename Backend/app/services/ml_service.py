"""ML model loading and prediction service.

Uses a HuggingFace Swin Transformer (PyTorch) for brain tumor classification.
Falls back to demo mode if the model files are missing.
"""

import numpy as np
from PIL import Image
from pathlib import Path
from app.config import get_settings

settings = get_settings()

CLASS_LABELS = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]
IMG_SIZE = (224, 224)

_model = None
_processor = None


def _load_model():
    """Attempt to load the Swin Transformer model; fall back to demo mode."""
    global _model, _processor
    model_dir = Path(settings.MODEL_PATH)
    if model_dir.exists() and (model_dir / "pytorch_model.bin").exists():
        try:
            import torch
            from transformers import AutoImageProcessor, SwinForImageClassification

            _processor = AutoImageProcessor.from_pretrained(str(model_dir))
            _model = SwinForImageClassification.from_pretrained(str(model_dir))
            _model.eval()
            print(f"[ML] Loaded Swin model from {model_dir}")
        except Exception as e:
            print(f"[ML] Failed to load model: {e}. Running in demo mode.")
            _model = "demo"
    else:
        print(f"[ML] Model files not found at {model_dir}. Running in demo mode.")
        _model = "demo"


def preprocess_image(image_path: str):
    """Load an image and preprocess using the model's processor."""
    img = Image.open(image_path).convert("RGB")
    if _processor is not None:
        inputs = _processor(images=img, return_tensors="pt")
        return inputs
    # Fallback for demo mode
    img = img.resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)


def predict(image_path: str) -> dict:
    """Run prediction and return label, confidence, and per-class probabilities."""
    global _model
    if _model is None:
        _load_model()

    if _model == "demo":
        img_array = preprocess_image(image_path)
        seed = int(np.sum(img_array * 1000)) % 10000
        rng = np.random.RandomState(seed)
        raw = rng.dirichlet(np.ones(len(CLASS_LABELS)))
        probs = raw.tolist()
    else:
        import torch
        inputs = preprocess_image(image_path)
        with torch.no_grad():
            outputs = _model(**inputs)
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=-1)[0].tolist()

    probabilities = {label: round(p, 4) for label, p in zip(CLASS_LABELS, probs)}
    predicted_idx = int(np.argmax(probs))
    prediction = CLASS_LABELS[predicted_idx]
    confidence = round(probs[predicted_idx], 4)

    return {
        "prediction": prediction,
        "confidence": confidence,
        "probabilities": probabilities,
    }
