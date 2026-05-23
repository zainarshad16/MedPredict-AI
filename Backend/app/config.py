"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/medpredict"
    SECRET_KEY: str = "your-super-secret-key-change-in-production-min-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    APP_NAME: str = "MedPredict AI"
    UPLOAD_DIR: str = "uploads"
    REPORTS_DIR: str = "reports"
    MODEL_PATH: str = "ml_model/BRAIN TUMOR MODEL (MedPredict)/BRAIN TUMOR MODEL (MedPredict)/trained_model"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
