# Forge Backend (API)

This is the NestJS backend for Forge. For product context and public-facing information, see the repo root `README.md`.

## Tech

- NestJS
- Prisma + Postgres
- OpenAPI/Swagger (served at `/docs`)

## Running locally

Prereqs: Node.js, Postgres.

```bash
npm install
```

Environment variables:
- `DATABASE_URL` (Postgres connection string)
- `PORT` (optional; defaults to `3000`)

Start dev server:

```bash
npm run start:dev
```

API base path is `/api/v1` and Swagger docs are at `/docs` (e.g. `http://localhost:3000/docs`).

## Useful scripts

- `npm run lint`
- `npm run test`
- `npm run build`
