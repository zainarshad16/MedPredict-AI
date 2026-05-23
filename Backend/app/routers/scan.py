"""Scan endpoints: upload MRI, get history, download report, dashboard stats."""

import os
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models.scan import Scan
from app.models.user import User
from app.schemas.scan import ScanResponse, StatsResponse
from app.services.ml_service import predict
from app.services.report_service import generate_report
from app.utils.auth import get_current_user

settings = get_settings()
router = APIRouter(prefix="/api/scans", tags=["Scans"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff"}


@router.post("/predict", response_model=ScanResponse, status_code=201)
async def create_prediction(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload an MRI image, run the model, save results, and generate a PDF report."""
    # Validate file type
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not supported. Use: {ALLOWED_EXTENSIONS}")

    # Save uploaded file
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    unique_name = f"{uuid.uuid4().hex}{ext}"
    image_path = os.path.join(settings.UPLOAD_DIR, unique_name)
    contents = await file.read()
    with open(image_path, "wb") as f:
        f.write(contents)

    # Run prediction
    try:
        result = predict(image_path)
    except Exception as e:
        os.remove(image_path)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    # Save scan record
    scan = Scan(
        user_id=current_user.id,
        image_path=image_path,
        prediction=result["prediction"],
        confidence=result["confidence"],
        probabilities=result["probabilities"],
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    # Generate PDF report
    try:
        report_path = generate_report(
            scan_id=scan.id,
            patient_name=current_user.full_name,
            image_path=image_path,
            prediction=result["prediction"],
            confidence=result["confidence"],
            probabilities=result["probabilities"],
        )
        scan.report_path = report_path
        db.commit()
        db.refresh(scan)
    except Exception as e:
        print(f"[Report] Generation failed: {e}")

    return scan


@router.get("/history", response_model=list[ScanResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Return all scans for the current user, newest first."""
    return (
        db.query(Scan)
        .filter(Scan.user_id == current_user.id)
        .order_by(Scan.created_at.desc())
        .all()
    )


@router.get("/stats", response_model=StatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Dashboard statistics for the current user."""
    scans = db.query(Scan).filter(Scan.user_id == current_user.id).all()
    total = len(scans)
    cancer = sum(1 for s in scans if s.prediction != "No Tumor")
    no_cancer = total - cancer
    recent = sorted(scans, key=lambda s: s.created_at, reverse=True)[:5]
    return StatsResponse(
        total_scans=total,
        cancer_detected=cancer,
        no_cancer=no_cancer,
        recent_scans=recent,
    )


@router.get("/report/{scan_id}")
def download_report(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Download the PDF report for a given scan."""
    scan = db.query(Scan).filter(Scan.id == scan_id, Scan.user_id == current_user.id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    if not scan.report_path or not Path(scan.report_path).exists():
        raise HTTPException(status_code=404, detail="Report not available")
    return FileResponse(
        scan.report_path,
        media_type="application/pdf",
        filename=f"MedPredict_Report_{scan.id}.pdf",
    )


@router.get("/image/{scan_id}")
def get_scan_image(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Serve the uploaded MRI image for a given scan."""
    scan = db.query(Scan).filter(Scan.id == scan_id, Scan.user_id == current_user.id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    if not Path(scan.image_path).exists():
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(scan.image_path)
