# MedPredict AI — Complete Implementation Documentation

## Overview

MedPredict AI is a full-stack brain tumor detection platform that uses a Swin Transformer (Vision Transformer) to classify brain MRI scans into four categories: Glioma, Meningioma, Pituitary Tumor, and No Tumor. It features JWT authentication, PDF report generation, scan history, and an admin panel.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19 + Vite 7 + Tailwind CSS 4     |
| Backend    | FastAPI (Python)                        |
| Database   | SQLite (dev) / PostgreSQL (production)  |
| Auth       | JWT (python-jose + bcrypt)              |
| ML Model   | PyTorch Swin Transformer (HuggingFace) |
| Charts     | Recharts                                |
| PDF        | ReportLab                               |
| Icons      | react-icons (HeroIcons 2) + lucide-react|

---

## Backend Implementation

### Entry Point — `run.py`

Starts the FastAPI development server using Uvicorn on `0.0.0.0:8000` with hot reload enabled.

### Application Setup — `app/main.py`

- Creates FastAPI app (title: "MedPredict AI", version: "2.0.0")
- Creates all database tables on startup via SQLAlchemy
- Configures CORS middleware (allows `localhost:5173`, `localhost:3000`, and `*`)
- Mounts static directories: `/uploads` and `/reports`
- Registers three routers: `auth`, `scan`, `admin`
- Provides `GET /` (app info) and `GET /health` (health check) endpoints

### Configuration — `app/config.py`

Centralized settings using Pydantic `BaseSettings`, loaded from `.env` file:

| Setting                       | Default                          |
|-------------------------------|----------------------------------|
| `DATABASE_URL`                | `sqlite:///./medpredict.db`      |
| `SECRET_KEY`                  | Dev key (change in production)   |
| `ALGORITHM`                   | `HS256`                          |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` (24 hours)                |
| `APP_NAME`                    | `MedPredict AI`                  |
| `UPLOAD_DIR`                  | `uploads`                        |
| `REPORTS_DIR`                 | `reports`                        |
| `MODEL_PATH`                  | Path to Swin Transformer model   |

Uses `@lru_cache()` for singleton pattern.

### Database — `app/database.py`

- SQLAlchemy engine with support for both SQLite and PostgreSQL
- `SessionLocal` factory for ORM sessions
- `Base` declarative base for all models
- `get_db()` FastAPI dependency that yields a session and handles cleanup

### Database Models — `app/models/`

#### User Model (`app/models/user.py`)

| Field             | Type           | Notes                     |
|-------------------|----------------|---------------------------|
| `id`              | Integer        | Primary key               |
| `email`           | String(255)    | Unique, indexed           |
| `full_name`       | String(255)    | Required                  |
| `hashed_password` | String(255)    | bcrypt hashed             |
| `is_active`       | Boolean        | Default: True             |
| `is_admin`        | Boolean        | Default: False            |
| `created_at`      | DateTime       | Auto-set on create        |
| `updated_at`      | DateTime       | Auto-set on update        |

- One-to-Many relationship with Scan (cascade delete)

#### Scan Model (`app/models/scan.py`)

| Field           | Type           | Notes                              |
|-----------------|----------------|-------------------------------------|
| `id`            | Integer        | Primary key                         |
| `user_id`       | Integer        | Foreign key to users.id             |
| `image_path`    | String(500)    | Path to uploaded MRI file           |
| `prediction`    | String(100)    | e.g., "Glioma", "No Tumor"         |
| `confidence`    | Float          | 0.0–1.0                            |
| `probabilities` | JSON           | Dict of all class probabilities     |
| `report_path`   | String(500)    | Path to generated PDF (optional)    |
| `created_at`    | DateTime       | Auto-set on create                  |

- Many-to-One relationship with User

### Pydantic Schemas — `app/schemas/`

#### User Schemas (`app/schemas/user.py`)

| Schema         | Purpose                | Fields                                    |
|----------------|------------------------|-------------------------------------------|
| `UserCreate`   | Registration request   | email (EmailStr), full_name, password     |
| `UserLogin`    | Login request          | email (EmailStr), password                |
| `UserResponse` | User response          | id, email, full_name, is_active, is_admin, created_at |
| `UserUpdate`   | Profile update request | full_name (optional), email (optional)    |
| `Token`        | Login response         | access_token, token_type                  |
| `TokenData`    | Internal token data    | user_id (optional)                        |

#### Scan Schemas (`app/schemas/scan.py`)

| Schema         | Purpose                | Fields                                              |
|----------------|------------------------|------------------------------------------------------|
| `ScanResponse` | Scan result response   | id, prediction, confidence, probabilities, image_path, report_path, created_at |
| `StatsResponse`| Dashboard stats        | total_scans, cancer_detected, no_cancer, recent_scans |

### API Endpoints — `app/routers/`

#### Authentication (`app/routers/auth.py`) — Prefix: `/api/auth`

| Method | Endpoint    | Auth     | Description                                    |
|--------|-------------|----------|------------------------------------------------|
| POST   | `/register` | No       | Create new user (validates unique email, hashes password) |
| POST   | `/login`    | No       | Authenticate user, returns JWT token           |
| GET    | `/me`       | Required | Get current user profile from token            |
| PUT    | `/me`       | Required | Update full_name or email                      |

#### Brain Scan Analysis (`app/routers/scan.py`) — Prefix: `/api/scans`

| Method | Endpoint          | Auth     | Description                                      |
|--------|-------------------|----------|--------------------------------------------------|
| POST   | `/predict`        | Required | Upload MRI image, run Swin Transformer inference, save results, generate PDF report |
| GET    | `/history`        | Required | Get all scans for current user (newest first)    |
| GET    | `/stats`          | Required | Dashboard stats: total, cancer/no-cancer counts, 5 recent scans |
| GET    | `/report/{id}`    | Required | Download PDF report for a scan                   |
| GET    | `/image/{id}`     | Required | Get uploaded MRI image for a scan                |

**Prediction endpoint flow:**
1. Validates file extension (.jpg, .jpeg, .png, .bmp, .tif, .tiff)
2. Saves file to `uploads/` with UUID filename
3. Runs ML prediction via `ml_service.predict()`
4. Creates Scan record in database
5. Generates PDF report via `report_service.generate_report()`
6. Returns ScanResponse

#### Admin Management (`app/routers/admin.py`) — Prefix: `/api/admin`

| Method | Endpoint                     | Auth  | Description                    |
|--------|------------------------------|-------|--------------------------------|
| GET    | `/users`                     | Admin | List all users                 |
| GET    | `/scans`                     | Admin | List last 100 scans            |
| DELETE | `/users/{id}`                | Admin | Delete a user (cascades scans) |
| PUT    | `/users/{id}/toggle-admin`   | Admin | Toggle admin role              |

### ML Service — `app/services/ml_service.py`

**Model**: Swin Transformer (microsoft/swin-tiny-patch4-window7-224)

**Class Labels**: `["Glioma", "Meningioma", "No Tumor", "Pituitary"]`

**Functions:**

- **`_load_model()`**: Lazy-loads the Swin Transformer from disk using HuggingFace `SwinForImageClassification.from_pretrained()`. Falls back to demo mode if model files are missing.

- **`preprocess_image(image_path)`**: Opens image, converts to RGB, processes through HuggingFace `AutoImageProcessor` (ImageNet normalization: mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225], resize to 224x224).

- **`predict(image_path)`**: Runs `torch.no_grad()` forward pass through the model, applies softmax to logits. Returns:
  ```python
  {
      "prediction": "Glioma",        # Highest probability class
      "confidence": 0.9456,           # Float (0-1)
      "probabilities": {              # All class probabilities
          "Glioma": 0.9456,
          "Meningioma": 0.0234,
          "No Tumor": 0.0189,
          "Pituitary": 0.0121
      }
  }
  ```

**Demo Mode**: When model files are missing, generates deterministic random predictions seeded by image pixel content.

### Report Service — `app/services/report_service.py`

Generates professional PDF medical reports using ReportLab.

**Report Sections:**
1. Header — "MedPredict AI — Diagnostic Report" with timestamp
2. Patient Information Table — Name, Report ID (MED-{ID}), Scan Type, Analysis Engine
3. MRI Thumbnail — Embedded uploaded image (60mm x 60mm)
4. Diagnosis Result — Prediction label (red if cancer, green if no tumor) with confidence %
5. Class Probabilities Table — All 4 classes with percentages
6. Disclaimer — Research/educational use notice

**Output**: `reports/report_{scan_id}_{timestamp}.pdf`

### Auth Utilities — `app/utils/auth.py`

| Function                | Purpose                                         |
|-------------------------|------------------------------------------------|
| `hash_password()`       | bcrypt hash with salt generation                |
| `verify_password()`     | Compare plain password with hash                |
| `create_access_token()` | Generate JWT with HS256, expiration claim       |
| `get_current_user()`    | FastAPI dependency — decode token, fetch user   |
| `get_current_admin()`   | FastAPI dependency — verify admin role (403 if not) |

### Admin Seeder — `seed_admin.py`

Creates initial admin user if none exists:
- Email: `admin@medpredict.ai`
- Password: `password123`
- Role: Admin

---

## Frontend Implementation

### Entry Point — `main.jsx`

Renders the React app into `#root` div with StrictMode.

### Routing — `App.jsx`

```
/                     → Landing (public)
/login                → Login (public)
/register             → Register (public)
/dashboard            → ProtectedRoute → DashboardLayout
  /dashboard          → Overview
  /dashboard/scan     → NewScan
  /dashboard/history  → History
  /dashboard/profile  → Profile
  /dashboard/about    → About
  /dashboard/admin    → Admin (admin only)
*                     → Redirect to /
```

Global providers: `AuthProvider`, `ThemeProvider`, `react-hot-toast`

### API Client — `src/api/axios.js`

- Base URL: `http://localhost:8000/api`
- Request interceptor: Attaches `Authorization: Bearer {token}` from localStorage
- Response interceptor: On 401, clears token and redirects to `/login`

### Context Providers — `src/context/`

#### AuthContext (`AuthContext.jsx`)

| Function          | Description                                    |
|-------------------|------------------------------------------------|
| `fetchUser()`     | Check token validity, load user from `/auth/me`|
| `login()`         | POST `/auth/login`, store token, fetch user    |
| `register()`      | POST `/auth/register`                          |
| `logout()`        | Clear token from localStorage, reset user      |
| `updateProfile()` | PUT `/auth/me`, update local state             |

**State**: `user` (object or null), `loading` (boolean)

#### ThemeContext (`ThemeContext.jsx`)

- Persists dark/light mode to localStorage (key: `"theme"`)
- Toggles `"dark"` class on `document.documentElement` for Tailwind dark mode
- Provides `dark` (boolean) and `toggle()` function

### Components — `src/components/`

#### Sidebar (`Sidebar.jsx`)

- Fixed overlay on mobile, collapsible on desktop
- Navigation links with icons:
  - Overview, New Scan, Scan History, Profile, About AI
  - Admin Panel (conditional — only for admin users)
- Logout button
- Active route highlighting

#### Navbar (`Navbar.jsx`)

- Hamburger menu (mobile) + sidebar collapse toggle
- Welcome greeting with user name
- Theme toggle
- Profile dropdown (user info, settings link, logout)

#### ProtectedRoute (`ProtectedRoute.jsx`)

- Shows loading spinner while auth state is being checked
- Redirects to `/login` if user is not authenticated
- Renders child components if authenticated

#### ThemeToggle (`ThemeToggle.jsx`)

- Custom toggle switch with sun/moon icons
- Smooth 300ms transition animation
- Accessible with aria-label

### Layout — `src/layouts/DashboardLayout.jsx`

- Responsive layout with sidebar + main content area
- Mobile: overlay sidebar with backdrop
- Desktop: collapsible sidebar
- Navbar at top of content area
- `<Outlet />` for nested route rendering

### Pages — `src/pages/`

#### Landing (`Landing.jsx`) — Public Homepage

- Hero section with gradient text and CTA buttons
- Feature cards grid (4 columns):
  - AI-Powered Analysis (Swin Transformer)
  - High Accuracy (vision transformers)
  - PDF Reports
  - Instant Results
- Conditional navigation (dashboard vs sign in/register)
- Footer disclaimer

#### Login (`Login.jsx`)

- Split layout: branding panel (desktop) + form panel
- Email and password validation
- Loading state with spinner
- Error display
- Link to registration page

#### Register (`Register.jsx`)

- Split layout: branding panel + form panel
- Fields: full name, email, password, confirm password
- Validation rules:
  - Name: 2-100 chars, letters/spaces/punctuation
  - Email: valid email format
  - Password: min 6 chars, uppercase + lowercase + number
  - Confirm: must match password
- Link to login page

#### Overview (`Overview.jsx`) — Dashboard Home

- Fetches stats from `GET /scans/stats`
- Three stat cards: Total Scans, No Cancer (green), Cancer Detected (red)
- Recent scans table (last 5) with prediction badges and confidence
- Quick-action "New Scan" button

#### NewScan (`NewScan.jsx`) — MRI Upload & Analysis

- Drag-and-drop upload area (react-dropzone)
- File validation: jpg/jpeg/png/bmp/tif/tiff, max 10 MB
- Image preview with file info
- "Analyze Scan" button → `POST /scans/predict`
- Results display:
  - Prediction badge (color-coded: red = cancer, green = no tumor)
  - Confidence percentage
  - MRI image preview
  - Bar chart of class probabilities (Recharts BarChart)
  - Individual probability detail cards (4-column grid)
  - Download PDF report button
  - "New Scan" reset button

#### History (`History.jsx`) — Scan History

- Fetches all scans from `GET /scans/history`
- Table columns: Scan ID (MED-{padded}), Date, Prediction (colored badge), Confidence (progress bar + %), Report (download button)
- Empty state message when no scans
- Loading spinner

#### Profile (`Profile.jsx`) — User Settings

- Avatar upload (drag-and-drop, stored as base64 in localStorage)
  - Max 2 MB, formats: jpg, png, gif, webp
  - Change/remove buttons
- User info display: avatar, name, email, admin/user badge
- Edit form: full name (email is read-only)
- Account info: ID, member since, status
- Save changes button

#### About (`About.jsx`) — AI Model Information

- Gradient overview card: "MedPredict AI Engine v2.0"
- Description of Swin Transformer model
- Specifications table:
  - Architecture: Swin Transformer (Vision Transformer)
  - Base Model: microsoft/swin-tiny-patch4-window7-224
  - Input Size: 224 x 224 x 3 (RGB)
  - Classes: Glioma, Meningioma, Pituitary, No Tumor
  - Training Data: ~7,000 MRI images (augmented)
  - Patch Size: 4 x 4
  - Framework: PyTorch / HuggingFace Transformers
  - Inference Time: < 2 seconds
- Pipeline visualization (4 steps): Upload → Preprocess → Inference → Report
- Disclaimer box

#### Admin (`Admin.jsx`) — Admin Panel

- Tab interface: Users / All Scans
- Users tab:
  - Table: ID, Name, Email, Role (badge), Joined, Actions
  - Toggle admin button (shield icon)
  - Delete user button (trash icon, prevents self-deletion)
- Scans tab:
  - Table: ID, Prediction (colored badge), Confidence, Date
  - Last 100 scans
- Stat chips showing totals

---

## Authentication Flow

1. User registers at `/register` → `POST /api/auth/register` (creates user with hashed password)
2. User logs in at `/login` → `POST /api/auth/login` (returns JWT token)
3. Token stored in `localStorage`
4. Axios interceptor adds `Authorization: Bearer {token}` to all API requests
5. Backend validates token via `get_current_user` dependency on protected endpoints
6. On 401 response, frontend clears token and redirects to `/login`

## ML Prediction Pipeline

1. User uploads MRI image via drag-and-drop on NewScan page
2. Frontend sends multipart/form-data to `POST /api/scans/predict`
3. Backend saves image to `uploads/{uuid}.{ext}`
4. Swin Transformer model loads (lazy, cached globally):
   - `AutoImageProcessor.from_pretrained()` for preprocessing
   - `SwinForImageClassification.from_pretrained()` for inference
5. Image preprocessed: RGB conversion → ImageNet normalization (mean/std) → resize to 224x224
6. Forward pass with `torch.no_grad()` → softmax on logits → class probabilities
7. Scan record saved to database with prediction, confidence, and probabilities
8. PDF report generated with ReportLab (patient info, MRI thumbnail, diagnosis, probabilities, disclaimer)
9. Frontend displays results: prediction badge, confidence, bar chart, probability cards, PDF download

## File Storage

| Type             | Location                              | Naming Convention                    |
|------------------|---------------------------------------|---------------------------------------|
| Uploaded images  | `Backend/uploads/`                    | `{uuid}.{ext}`                       |
| PDF reports      | `Backend/reports/`                    | `report_{scan_id}_{timestamp}.pdf`   |
| ML model         | `Backend/ml_model/.../trained_model/` | `config.json`, `preprocessor_config.json`, `pytorch_model.bin` |
| SQLite database  | `Backend/medpredict.db`               | Auto-created on startup              |

## Default Credentials

| Role  | Email                 | Password    |
|-------|-----------------------|-------------|
| Admin | admin@medpredict.ai   | password123 |

Run `python seed_admin.py` to create the admin user.
