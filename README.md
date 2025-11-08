# Astro + Payload Monorepo Starter

Monorepo that co-locates a Payload CMS (Next.js) app and an Astro frontend. The root is managed by pnpm with workspace filters to run each package independently or together.

## Workspace structure

- `payload/` – Payload CMS v3 running inside Next.js, stores data in PostgreSQL.
- `website/` – Astro 5 site that consumes the Payload config via `payload-app` and exposes server actions to mutate content.
- `package.json` – Workspace scripts (`pnpm dev`, `pnpm dev:payload`, `pnpm dev:website`, etc.) and shared configuration.

## Prerequisites

1. Copy both example env files:
   - `cp payload/.env.example payload/.env`
   - `cp website/.env.example website/.env`
2. Adjust `DATABASE_URI` / `PAYLOAD_SECRET` if you are not using the default Postgres service defined in the Docker assets.
3. Install dependencies once from the repo root with `pnpm install` (the workspace uses pnpm features such as filters and shared lockfile).

## Local development

- Run both apps: `pnpm dev` (spawns Payload on `http://localhost:3000` and Astro on `http://localhost:4321`).
- Run a single package: `pnpm dev:payload` or `pnpm dev:website`.
- Generate Payload types/import map: from `payload/`, use `pnpm generate:types` / `pnpm generate:importmap`.
- API + DB via Docker: inside `payload/`, `docker compose up -d` will start the Payload dev server plus the Postgres instance declared in `payload/docker-compose.yml`.

## Dev Container workflow

The repository ships with a ready-to-use VS Code / GitHub Codespaces dev container (`.devcontainer/`). It defines:

- `app` service based on the official devcontainers Node 18 image with pnpm pre-enabled.
- `db` service (Postgres 16) sharing the same credentials as the workspace `.env.example` files.
- Forwarded ports `3000`, `4321`, and `5432` so Payload, Astro, and Postgres remain accessible from the host.

When you "Reopen in Container", VS Code builds the `app` image, mounts the repo at `/workspaces/<name>`, installs dependencies via `pnpm install`, and keeps the Postgres container running in the background so both apps can connect to `postgres://postgres:postgres@db:5432/payload` out of the box.

## Useful scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run Payload + Astro simultaneously via `concurrently`. |
| `pnpm dev:payload` | Run only the Payload/Next app. |
| `pnpm dev:website` | Run only the Astro site. |
| `pnpm --filter ./website build` | Build the Astro server output (uses @astrojs/node). |
| `pnpm --filter ./payload build` | Build the Next/Payload app. |

## Troubleshooting

- If pnpm warns about `onlyBuiltDependencies`, move that setting from `payload/package.json` to the workspace root to make it effective.
- Ensure `PAYLOAD_SECRET` is set before starting either app; the Payload config throws if the variable is missing to avoid running with an insecure secret.
- If using Docker/DevContainers on Linux, add the repo folder to Docker Desktop file sharing or set the appropriate permissions so Postgres can write to the named volume.
