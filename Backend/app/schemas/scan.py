"""Pydantic schemas for scan/prediction requests and responses."""

from pydantic import BaseModel
from datetime import datetime
from typing import Dict, Optional


class ScanResponse(BaseModel):
    id: int
    prediction: str
    confidence: float
    probabilities: Dict[str, float]
    image_path: str
    report_path: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class StatsResponse(BaseModel):
    total_scans: int
    cancer_detected: int
    no_cancer: int
    recent_scans: list[ScanResponse]
