# Meal Planner 🥗

Planer posiłków: przepisy, plan na tydzień i automatyczna lista zakupów.

React (Vite + TypeScript) + Spring Boot 4 (Java 21) w jednym repozytorium (monorepo).

```
.
├── backend/            Spring Boot – REST API pod /api/**
├── frontend/           React + Vite – SPA, serwowane przez nginx
├── .github/workflows/  CI: osobny pipeline dla backendu i frontendu
├── .claude/            ustawienia Claude Code współdzielone w zespole
├── CLAUDE.md           kontekst projektu dla Claude Code
└── docker-compose.yml  całość „jak na produkcji”
```

## Wymagania
- Java 21, Maven 3.9+
- Node.js 22+
- Docker (opcjonalnie, do `docker compose`)

## Uruchomienie lokalne (dev)

```bash
# terminal 1 – backend na :8080
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# terminal 2 – frontend na :5173 (proxy /api -> :8080)
cd frontend
npm ci
npm run dev
```

Otwórz http://localhost:5173.

## Uruchomienie „produkcyjne” (Docker)

```bash
cp .env.example .env
docker compose up --build
```

Otwórz http://localhost:8080 — nginx serwuje zbudowanego Reacta i przekazuje `/api/**` do backendu.
Frontend i backend są pod tym samym originem, więc nie ma potrzeby konfigurowania CORS.

## Testy

```bash
cd backend && mvn -B verify
cd frontend && npm run typecheck && npm test && npm run build
```

## Pierwsza konfiguracja po sklonowaniu (jednorazowo)

Dodaj Maven Wrapper, żeby każdy (i CI) budował tą samą wersją Mavena:

```bash
cd backend
mvn -N wrapper:wrapper
git add mvnw mvnw.cmd .mvn && git commit -m "Add Maven wrapper"
```
