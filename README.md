<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,50:8b5cf6,100:a855f7&height=200&section=header&text=MedPredict%20AI&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Brain%20Tumor%20Detection%20Platform&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<!-- Badges Row 1 -->
<a href="https://github.com/zainarshad16/MedPredict-AI/stargazers">
  <img src="https://img.shields.io/github/stars/zainarshad16/MedPredict-AI?style=for-the-badge&logo=starship&color=6366f1&labelColor=0f0f1a" alt="Stars"/>
</a>
<a href="https://github.com/zainarshad16/MedPredict-AI/network/members">
  <img src="https://img.shields.io/github/forks/zainarshad16/MedPredict-AI?style=for-the-badge&logo=git&color=8b5cf6&labelColor=0f0f1a" alt="Forks"/>
</a>
<a href="https://github.com/zainarshad16/MedPredict-AI/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge&labelColor=0f0f1a" alt="License"/>
</a>
<img src="https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge&labelColor=0f0f1a" alt="Status"/>

<br/><br/>

<!-- Tech Stack Badges Row 2 -->
<img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch"/>
<img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="HuggingFace"/>
<img src="https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>

<br/><br/>

> 🧠 **Detect brain tumors from MRI scans in seconds** — powered by a Swin Transformer (Vision Transformer) with JWT authentication, PDF diagnostic reports, scan history, and an admin dashboard.

<br/>

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🏗️ Architecture](#️-architecture)
- [⚙️ Tech Stack](#️-tech-stack)
- [🤖 AI Model](#-ai-model)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [📡 API Reference](#-api-reference)
- [📁 Project Structure](#-project-structure)
- [🔐 Default Credentials](#-default-credentials)
- [⚠️ Disclaimer](#️-disclaimer)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 AI-Powered Analysis
- **Swin Transformer** (Vision Transformer) for MRI classification
- Classifies into **4 categories**: Glioma, Meningioma, Pituitary Tumor, No Tumor
- **< 2 second** inference time
- Confidence scores & probability distributions

</td>
<td width="50%">

### 📊 Rich Dashboard
- Interactive stats with cancer detection metrics
- Scan history with searchable records
- Color-coded prediction badges
- Bar chart visualizations (Recharts)

</td>
</tr>
<tr>
<td width="50%">

### 📄 PDF Diagnostic Reports
- Auto-generated professional reports via ReportLab
- Embedded MRI thumbnail + diagnosis
- Patient information, probability table & disclaimer
- One-click download from the dashboard

</td>
<td width="50%">

### 🔒 Secure Authentication
- JWT-based auth (HS256, 24h expiry)
- bcrypt password hashing
- Protected routes & admin role guard
- Full profile management

</td>
</tr>
</table>

---

## 🖼️ Screenshots

<div align="center">

| Landing Page | Dashboard Overview | New Scan |
|:---:|:---:|:---:|
| Public hero with feature cards | Stats & recent scan table | Drag-and-drop MRI upload |

| Scan Results | History | Admin Panel |
|:---:|:---:|:---:|
| Prediction + confidence + chart | Full scan record table | User & scan management |

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     MedPredict AI                        │
│                                                          │
│  ┌─────────────────────┐    ┌────────────────────────┐  │
│  │   Frontend (React)  │    │  Backend (FastAPI)      │  │
│  │                     │◄──►│                         │  │
│  │  Vite 7 + Tailwind  │    │  Python + SQLAlchemy    │  │
│  │  React Router v6    │    │  JWT Auth + bcrypt      │  │
│  │  Recharts           │    │  ReportLab PDF          │  │
│  └─────────────────────┘    └────────────┬───────────┘  │
│                                          │               │
│                              ┌───────────▼───────────┐  │
│                              │    ML Service          │  │
│                              │  Swin Transformer      │  │
│                              │  HuggingFace + PyTorch │  │
│                              └────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### ML Prediction Pipeline

```
User uploads MRI
      │
      ▼
Validate & save to uploads/{uuid}.ext
      │
      ▼
AutoImageProcessor → RGB → ImageNet normalization → 224×224
      │
      ▼
Swin Transformer forward pass (torch.no_grad)
      │
      ▼
Softmax → class probabilities
      │
      ▼
Save to DB + Generate PDF → Return results to frontend
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite 7 | SPA framework |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Backend** | FastAPI (Python) | REST API |
| **Database** | SQLite / PostgreSQL | Data persistence |
| **Auth** | JWT (python-jose) + bcrypt | Secure authentication |
| **ML Model** | PyTorch + HuggingFace | Brain tumor inference |
| **Charts** | Recharts | Data visualization |
| **PDF** | ReportLab | Diagnostic report generation |
| **Icons** | HeroIcons 2 + lucide-react | UI icons |
| **Deployment** | Vercel (FE) + HuggingFace Spaces (BE) | Cloud hosting |

---

## 🤖 AI Model

<div align="center">

```
Model:      microsoft/swin-tiny-patch4-window7-224 (Swin Transformer)
Framework:  PyTorch / HuggingFace Transformers
Input:      224 × 224 × 3 (RGB)
Patch size: 4 × 4
Classes:    Glioma · Meningioma · No Tumor · Pituitary
Training:   ~7,000 MRI images (augmented)
Inference:  < 2 seconds
```

</div>

### Output Format

```json
{
  "prediction": "Glioma",
  "confidence": 0.9456,
  "probabilities": {
    "Glioma":     0.9456,
    "Meningioma": 0.0234,
    "No Tumor":   0.0189,
    "Pituitary":  0.0121
  }
}
```

> **Demo Mode**: When model weights are not present, the service generates deterministic random predictions seeded by image pixel content — useful for UI development.

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+ and npm
- **Git**

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd Backend

# 2. Create a virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create environment file
cp .env.example .env   # then fill in your SECRET_KEY

# 5. Seed the admin user
python seed_admin.py

# 6. Start the development server
python run.py
# API will be available at http://localhost:8000
```

> ⚡ The database tables are auto-created on startup via SQLAlchemy.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# App will be available at http://localhost:5173
```

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new user |
| `POST` | `/login` | ❌ | Login → returns JWT |
| `GET` | `/me` | ✅ | Get current user profile |
| `PUT` | `/me` | ✅ | Update profile |

### Scans — `/api/scans`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/predict` | ✅ | Upload MRI → get prediction + PDF |
| `GET` | `/history` | ✅ | All scans for current user |
| `GET` | `/stats` | ✅ | Dashboard statistics |
| `GET` | `/report/{id}` | ✅ | Download PDF report |
| `GET` | `/image/{id}` | ✅ | Get uploaded MRI image |

### Admin — `/api/admin`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users` | 👑 Admin | List all users |
| `GET` | `/scans` | 👑 Admin | Last 100 scans |
| `DELETE` | `/users/{id}` | 👑 Admin | Delete user (cascades) |
| `PUT` | `/users/{id}/toggle-admin` | 👑 Admin | Toggle admin role |

---

## 📁 Project Structure

```
MedPredict-AI/
├── Backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app entry, CORS, routers
│   │   ├── config.py           # Pydantic settings (env vars)
│   │   ├── database.py         # SQLAlchemy engine & session
│   │   ├── models/
│   │   │   ├── user.py         # User ORM model
│   │   │   └── scan.py         # Scan ORM model
│   │   ├── schemas/
│   │   │   ├── user.py         # Pydantic user schemas
│   │   │   └── scan.py         # Pydantic scan schemas
│   │   ├── routers/
│   │   │   ├── auth.py         # /api/auth endpoints
│   │   │   ├── scan.py         # /api/scans endpoints
│   │   │   └── admin.py        # /api/admin endpoints
│   │   ├── services/
│   │   │   ├── ml_service.py   # Swin Transformer inference
│   │   │   └── report_service.py # PDF generation (ReportLab)
│   │   └── utils/
│   │       └── auth.py         # JWT helpers & FastAPI deps
│   ├── ml_model/               # Model weights directory
│   ├── uploads/                # Uploaded MRI images
│   ├── reports/                # Generated PDF reports
│   ├── seed_admin.py           # Admin user seeder
│   ├── run.py                  # Uvicorn dev server
│   ├── requirements.txt
│   └── Dockerfile
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance + interceptors
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Auth state & functions
│   │   │   └── ThemeContext.jsx# Dark/light mode
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   └── pages/
│   │       ├── Landing.jsx     # Public homepage
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Overview.jsx    # Dashboard home
│   │       ├── NewScan.jsx     # MRI upload & results
│   │       ├── History.jsx     # Scan history table
│   │       ├── Profile.jsx     # User settings
│   │       ├── About.jsx       # AI model info
│   │       └── Admin.jsx       # Admin panel
│   ├── package.json
│   └── vite.config.js
│
├── IMPLEMENTATION.md           # Detailed technical docs
└── README.md
```

---

## 🔐 Default Credentials

> ⚠️ **Change these immediately in production.**

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@medpredict.ai` | `password123` |

Run `python seed_admin.py` from the `Backend/` directory to create the admin user.

---

## 🌐 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| **Frontend** | Vercel | Auto-deploy from `main` branch |
| **Backend** | HuggingFace Spaces | Dockerized FastAPI |
| **Database** | PostgreSQL (prod) | Configure via `DATABASE_URL` env var |

---

## ⚠️ Disclaimer

> **For Research & Educational Use Only.**
>
> MedPredict AI is **not** a certified medical device and should **not** be used as a substitute for professional medical diagnosis, advice, or treatment. Always consult a qualified healthcare provider for medical decisions.

---

<div align="center">

**Made with ❤️ and 🧠 by [Zain Arshad](https://github.com/zainarshad16)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:a855f7,50:8b5cf6,100:6366f1&height=100&section=footer" width="100%"/>

</div>