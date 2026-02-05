# Forge

Forge is a personal life intelligence system that turns daily behavior into insight, coaching, and deliberate self-improvement using data and AI.

Forge is built for long-term clarity, not short-term motivation.

## What Forge does

- Captures life signals as **timestamped, structured events** (append-only).
- Builds **derived metrics and patterns** over time (rebuildable from events).
- Uses AI as a **reasoning layer** to explain patterns and suggest adjustments (grounded in real data, with uncertainty).

## Core modules (v1)

- **Physical**: training & recovery (workout ingestion, progression/plateau signals)
- **Behavioral**: habits (consistency, interference, drop-offs)
- **Recovery**: urge/relapse tracking (triggers, high-risk windows; no explicit content)
- **Cognitive**: tasks & planning (execution vs avoidance, carryover)
- **Intelligence layer**: AI coach (weekly reviews, “why did this week feel worse?”, etc.)

## Non-negotiable principles

- **Truth over convenience**: raw data is immutable; history is not rewritten.
- **Insight before advice**: “not enough data yet” is a valid outcome.
- **AI explains, not commands**: suggestions with rationale; user retains agency.
- **Private by default**: designed for personal data; minimal sharing by design.

## API and docs

- API endpoints list: `docs/api_endpoints.md`
- Product plan: `docs/product_plan.md`
- System framing: `docs/system_framing.md`

## Repository layout

- `backend/` — NestJS API (Prisma + Postgres)
- `docs/` — product/system documentation

## Local development (backend)

Prereqs: Node.js, Postgres.

```bash
cd backend
npm install
```

Set environment variables:
- `DATABASE_URL` (Postgres connection string)
- `PORT` (optional; defaults to `3000`)

Run the API:

```bash
cd backend
npm run start:dev
```

The API is served under `http://localhost:3000/api/v1` and Swagger docs are at `http://localhost:3000/docs`.

## Status

Forge is under active development. Expect breaking changes while the event model and projections stabilize.

