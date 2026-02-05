# Forge — API Endpoints (v1)

This document lists the API endpoints to implement for Forge v1 based on `docs/product_plan.md` and the event-sourcing framing in `docs/system_framing.md`.

Conventions:
- **Events are append-only** (no deletes/edits). Corrections happen by writing a new event with `supersedeId`.
- “Domain endpoints” (habits/urges/tasks) are convenience wrappers that **write events** under the hood.
- All endpoints are assumed **authenticated** unless marked **Public**.
- Forge is **multi-user**: every write/read is scoped to the authenticated user. The API must never accept a `userId` from clients for scoping.

---

## Multi-user Requirements (v1)

- Every row in truth/derived tables should be owned by a user (`userId`) and queries must always filter by the authenticated user.
- All resource endpoints must enforce ownership (no cross-user reads/writes).
- External integrations (Hevy) are per-user; webhooks must resolve the target user via the integration record (not via user-provided ids).
- Add basic abuse controls (rate limiting on auth + write endpoints) before inviting others.

---

## Auth

- `POST /auth/register` (**Public**) — create user
- `POST /auth/login` (**Public**) — login
- `POST /auth/logout` — logout
- `POST /auth/refresh` — refresh access token (if using refresh tokens)
- `GET /auth/me` — current session/user

(Optional but recommended for “real product” behavior)
- `POST /auth/forgot-password` (**Public**) — start reset flow
- `POST /auth/reset-password` (**Public**) — complete reset flow
- `POST /auth/verify-email` (**Public**, optional) — verify email

---

## User

- `GET /user/me` — current user profile
- `PATCH /user/me` — update profile fields (non-sensitive only)

---

## Events (Source of Truth; Append-Only)

- `POST /events` — append a single event
- `POST /events/batch` — append many events (backfills/imports)
- `GET /events` — list events (filters; always scoped to current user)
- `GET /events/:id` — fetch event by id (must be owned by current user)

Suggested `POST /events` body shape:
- `occurredAt` (timestamp)
- `recordedAt` (optional; server can set)
- `type` (string enum)
- `source` (object: `id`, `clientId?`, `metadata?`)
- `payload` (typed per `type`)
- `supersedeId?` (string/id of event being corrected)

Server rules:
- `userId` is derived from the auth context (never accepted from the request body).
- `recordedAt` can be set server-side for consistency.

---

## Integrations — Hevy

- `POST /integrations/hevy/connect` — start/connect Hevy integration
- `GET /integrations/hevy/status` — integration status + last sync info
- `POST /integrations/hevy/sync` — trigger pull sync (historic/incremental)
- `POST /webhooks/hevy` (**Public**) — receive Hevy webhook events (verify signature)

---

## Habits (Convenience; Writes Events)

- `POST /habits` — create habit definition
- `GET /habits` — list habits
- `GET /habits/:id` — habit details
- `PATCH /habits/:id` — update habit definition (definitions may evolve; check-ins remain immutable)
- `POST /habits/:id/checkins` — log habit check-in event

---

## Recovery — Urges / Relapse (Convenience; Writes Events)

- `POST /urges` — log urge event (no explicit content)
- `POST /recovery-actions` — log recovery action event
- `POST /relapses` — log relapse event (no explicit content)

(Optional convenience reads; otherwise use `GET /events` filters)
- `GET /urges`
- `GET /relapses`

---

## Cognitive — Tasks & Planning (Convenience; Writes Events)

- `POST /tasks` — create task
- `GET /tasks` — list tasks (projection)
- `GET /tasks/:id` — task details (projection)
- `POST /tasks/:id/complete` — log completion event
- `POST /tasks/:id/postpone` — log postpone/carryover event
- `POST /plans/daily` — save daily plan snapshot event (optional)

---

## Timeline & Metrics (Derived / Rebuildable Read Models)

- `GET /timeline` — unified timeline view (merged across modules)

Training:
- `GET /metrics/training` — volume/intensity/progression over time

Habits:
- `GET /metrics/habits` — consistency/drop-offs/interference

Urges:
- `GET /metrics/urges` — triggers + high-risk windows

Tasks:
- `GET /metrics/tasks` — completion rate, carryover, avoidance signals

---

## AI Coach (Reasoning Layer)

- `POST /ai/query` — natural-language question grounded in data
- `POST /ai/reviews/weekly` — generate weekly review for a given week
- `POST /ai/feedback` — user feedback on AI outputs

AI output requirements:
- Cite **time ranges** and reference real data (events/metrics).
- “Not enough data yet” must be a valid state.
- Must not invent facts, diagnose, or moralize.

---

## Ops (Optional but Useful)

- `GET /health` (**Public**) — liveness
- `GET /ready` (**Public**) — readiness (db reachable, migrations applied)
