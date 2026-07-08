# SheBalance Build TODO

## Phase 1 — Project scaffolding
- [x] Create root README
- [x] Create root docker-compose.yml (optional, for MongoDB)
- [x] Create `frontend/` (Vite + React + Tailwind + Router + Axios)
- [x] Create `backend/` (Express + Mongoose + JWT + Multer)
- [x] Create `ai-service/` (FastAPI + inference placeholder)
- [x] Add shared env templates: `.env.example` files for each service

## Phase 2 — Core backend foundation
- [ ] MongoDB models: Users, Doctors, Appointments, Assessments, Reports
- [ ] Auth routes: register/login, JWT verification middleware
- [ ] Protected routes + admin role guard
- [ ] Assessment routes (submit assessment + compute risk)
- [ ] Report routes (PDF generation + email)

## Phase 3 — Core frontend foundation
- [ ] App shell + navigation (public + auth routes)
- [ ] Landing page (animated, modern healthcare styling)
- [ ] Register + Login pages (React Hook Form)
- [ ] Dashboard page (charts + history + summaries)

## Phase 4 — Health assessment + AI risk
- [ ] Long assessment form
- [ ] Risk calculation + explanation + recommendations
- [ ] Chart.js monthly progress + assessment history

## Phase 5 — Image analysis module
- [ ] Upload page (ultrasound/pelvic scan)
- [ ] Backend image upload handler (Multer)
- [ ] Call AI microservice for inference
- [ ] Render heatmap/confidence + educational summary
- [ ] Store analysis results + allow download report

## Phase 6 — Consultancy (Google Maps)
- [ ] Doctors listing from DB
- [ ] Nearby search using Google Maps API (server-side or client-side)
- [ ] Appointment booking + PDF attachment

## Phase 7 — Admin panel
- [ ] Admin login
- [ ] Manage doctors/patients, view reports, analytics placeholders

## Phase 8 — Testing & docs
- [ ] Local run instructions in README
- [ ] Basic API sanity tests
- [ ] Lint/build scripts

## Completion criteria
- [ ] All services run locally:
  - [ ] `frontend`: npm install && npm run dev
  - [ ] `backend`: npm install && npm start
  - [ ] `ai-service`: pip install -r requirements.txt && python app.py
- [ ] Core user flows work end-to-end.

