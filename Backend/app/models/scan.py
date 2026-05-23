"""Scan / prediction result database model."""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_path = Column(String(500), nullable=False)
    prediction = Column(String(100), nullable=False)          # e.g. "Glioma"
    confidence = Column(Float, nullable=False)                 # e.g. 0.94
    probabilities = Column(JSON, nullable=False)               # {"Glioma": 0.94, ...}
    report_path = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="scans")
