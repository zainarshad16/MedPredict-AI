# MedPredict AI — Brain Tumor Detection Platform

AI-powered brain tumor detection and classification from MRI scans. Built with React, FastAPI, SQLite, and PyTorch (Swin Transformer).

---

## Features

- **JWT Authentication** — Secure register/login with bcrypt password hashing
- **MRI Upload & Prediction** — Upload brain MRI images, get instant AI classification
- **4-Class Detection** — Glioma, Meningioma, Pituitary, No Tumor
- **Confidence Visualization** — Bar charts and probability breakdown
- **PDF Reports** — Auto-generated medical-style diagnostic reports
- **Scan History** — Full history with downloadable reports
- **Admin Panel** — Manage users and view all platform activity
- **Dark Mode** — Toggle between light and dark themes
- **Responsive** — Works on desktop, tablet, and mobile

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Frontend   | React 19 + Vite + Tailwind CSS 4 |
| Backend    | FastAPI (Python)              |
| Database   | PostgreSQL                    |
| Auth       | JWT (python-jose + bcrypt)    |
| ML Model   | PyTorch Swin Transformer (HuggingFace) |
| Charts     | Recharts                      |
| PDF        | ReportLab                     |

---

## Project Structure

```
medpredict/
├── Backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── config.py            # Environment config
│   │   ├── database.py          # SQLAlchemy setup
│   │   ├── models/              # DB models (User, Scan)
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/             # API routes (auth, scan, admin)
│   │   ├── services/            # ML prediction, PDF generation
│   │   └── utils/               # Auth helpers (JWT, bcrypt)
│   ├── ml_model/                # Place Swin Transformer model here
│   ├── uploads/                 # Uploaded MRI images
│   ├── reports/                 # Generated PDF reports
│   ├── requirements.txt
│   ├── run.py
│   ├── seed_admin.py
│   ├── Dockerfile
│   └── .env
│
├── Fontend/
│   ├── src/
│   │   ├── api/axios.js         # Axios instance with JWT interceptor
│   │   ├── context/             # Auth & Theme providers
│   │   ├── components/          # Sidebar, Navbar, ProtectedRoute
│   │   ├── layouts/             # DashboardLayout
│   │   └── pages/               # All page components
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Prerequisites

- **Node.js** 18+
- **Python** 3.10+
- **PostgreSQL** 14+ (running locally or remote)

---

## Setup Instructions

### 1. Database

Create a PostgreSQL database:

```sql
CREATE DATABASE medpredict;
```

### 2. Backend

```bash
cd Backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Edit .env with your database credentials
# DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/medpredict

# Seed admin user (optional)
python seed_admin.py
# Admin credentials: admin@medpredict.ai / admin123

# Start server
python run.py
```

Backend runs at: **http://localhost:8000**
API docs at: **http://localhost:8000/docs**

### 3. Frontend

```bash
cd Fontend

# Install dependencies (already done if node_modules exists)
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint                    | Auth     | Description              |
|--------|-----------------------------|----------|--------------------------|
| POST   | `/api/auth/register`        | No       | Register new user        |
| POST   | `/api/auth/login`           | No       | Login, returns JWT       |
| GET    | `/api/auth/me`              | Yes      | Get current user profile |
| PUT    | `/api/auth/me`              | Yes      | Update profile           |
| POST   | `/api/scans/predict`        | Yes      | Upload MRI & predict     |
| GET    | `/api/scans/history`        | Yes      | Get user's scan history  |
| GET    | `/api/scans/stats`          | Yes      | Dashboard statistics     |
| GET    | `/api/scans/report/{id}`    | Yes      | Download PDF report      |
| GET    | `/api/scans/image/{id}`     | Yes      | Get scan image           |
| GET    | `/api/admin/users`          | Admin    | List all users           |
| GET    | `/api/admin/scans`          | Admin    | List all scans           |
| DELETE | `/api/admin/users/{id}`     | Admin    | Delete a user            |
| PUT    | `/api/admin/users/{id}/toggle-admin` | Admin | Toggle admin role |

---

## ML Model

Place your trained Swin Transformer model directory at `Backend/ml_model/` with the following files: `config.json`, `preprocessor_config.json`, `pytorch_model.bin`.

**Current model:** microsoft/swin-tiny-patch4-window7-224 (fine-tuned)

**Expected spec:**
- Architecture: Swin Transformer (Shifted Window Transformer)
- Input shape: `(224, 224, 3)` — RGB with ImageNet normalization
- Output: 4 softmax classes — `[Glioma, Meningioma, No Tumor, Pituitary]`
- Framework: PyTorch / HuggingFace Transformers

**Without a model**, the app runs in **demo mode** with deterministic predictions based on image content. This lets you test the full UI/UX flow without training.

**Recommended dataset:** [Brain Tumor MRI Dataset on Kaggle](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)

---

## Deployment

### Railway

1. Push code to GitHub
2. Create two Railway services: one for Backend, one for Frontend
3. Add a PostgreSQL plugin for the database
4. Set environment variables in the Backend service
5. Frontend build command: `npm run build`, output: `dist`

### Render

**Backend:**
- Runtime: Python
- Build: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Frontend:**
- Runtime: Static Site
- Build: `npm run build`
- Publish: `dist`

### Docker

```bash
cd Backend
docker build -t medpredict-api .
docker run -p 8000:8000 --env-file .env medpredict-api
```

---

## Default Credentials

| Role  | Email                 | Password  |
|-------|-----------------------|-----------|
| Admin | admin@medpredict.ai   | admin123  |

> Run `python seed_admin.py` to create the admin user.

---

## License

For educational and research purposes only. Not a medical device.
