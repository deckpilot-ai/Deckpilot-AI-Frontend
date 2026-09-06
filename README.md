# deckpilotAI frontend

Next.js 16 App Router UI for authentication, project sessions, document uploads, real-time generation progress, and PowerPoint download.

## Prerequisites and local setup

- Node.js 24
- npm 11+
- A running deckpilotAI backend

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`. `NEXT_PUBLIC_API_BASE_URL` must include the backend API prefix, for example `http://localhost:8000/api/v1`. It is embedded into browser code at build time, so set the final public HTTPS API URL before each production build.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

## Production deployment

Run the production server directly with `npm run build` followed by `npm run start`, or use the standalone non-root image:

```powershell
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1 -t deckpilotai-frontend .
docker run --rm -p 3000:3000 deckpilotai-frontend
```

Use a TLS-terminating reverse proxy in front of the server. Build all replicas from the same artifact. The app has no Server Actions or ISR-backed user data; project state lives in the backend.
