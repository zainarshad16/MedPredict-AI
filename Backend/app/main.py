"""MedPredict AI — FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import get_settings
from app.database import engine, Base
from app.routers import auth, scan, admin

settings = get_settings()

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered Brain Tumor Detection Platform",
    version="2.0.0",
)

# CORS — allow the React dev server and common deployment origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images and reports as static files
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
app.mount("/reports", StaticFiles(directory=settings.REPORTS_DIR), name="reports")

# Register routers
app.include_router(auth.router)
app.include_router(scan.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "version": "2.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
