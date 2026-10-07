# CLAUDE.md

Kontekst projektu dla Claude Code. Czytany automatycznie na starcie każdej sesji — trzymaj go krótkim i aktualnym.

## Struktura (monorepo)
- `backend/` — Spring Boot 4, Java 21, Maven. REST API pod prefiksem `/api/**`. Pakiet bazowy `com.example.app`.
- `frontend/` — React 19 + TypeScript + Vite. Wywołania API tylko przez `src/api/client.ts`.
- W dev Vite proxuje `/api` → `localhost:8080`; na produkcji robi to nginx (`frontend/nginx.conf`). Nie dodawaj CORS — nie jest potrzebny.

## Komendy
Backend (z katalogu `backend/`):
- build + testy: `mvn -B verify` (lub `./mvnw -B verify`, jeśli jest wrapper)
- uruchomienie: `mvn spring-boot:run -Dspring-boot.run.profiles=dev`

Frontend (z katalogu `frontend/`):
- `npm run dev` — serwer dev na :5173
- `npm run typecheck`, `npm test`, `npm run build`

Całość: `docker compose up --build` → http://localhost:8080

## Zasady pracy
- Po każdej zmianie uruchom testy modułu, który zmieniłeś (backend: `mvn -B verify`, frontend: `npm test && npm run typecheck`). Nie kończ zadania z czerwonymi testami.
- Backend: struktura pakietów po funkcjonalności (`hello/`, `user/`...), nie po warstwach. DTO jako `record`. Kontroler cienki, logika w serwisie.
- Frontend: komponenty funkcyjne, TypeScript `strict`, bez `any`.
- Nowy endpoint = test w `backend/src/test` + typ w `frontend/src/api/client.ts`.
- Nie commituj sekretów ani `.env`. Konfiguracja przez zmienne środowiskowe.
- Commity: krótki tytuł w trybie rozkazującym (np. `Add user list endpoint`), jedna logiczna zmiana na commit.
- Nie pushuj i nie rób merge do `main` bez wyraźnej prośby.
