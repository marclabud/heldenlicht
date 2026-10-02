# Technical Onboarding & Context Handbook
*(For Antigravity 2.0 Building Agents)*

## 1. Handshake & Workspace Rules
- **Workspace-Grenze**: Du darfst ausschließlich Dateien innerhalb dieses Git-Repositories modifizieren. 
- **Verantwortlichkeit**: Du bist für die Implementierung, das lokale Testen und die funktionale Verifikation verantwortlich. Alle grundlegenden Architekturmuster werden vom menschlichen Architekten vorgegeben.

## 2. Tech Stack & Tools
- **Package Manager**: pnpm (über Corepack auf Version `10.33.0` gepinned).
- **Corepack aktivieren**: Führe vor Installationsschritten immer `corepack enable` aus.
- **Frontend**: Nuxt 4 / React / Svelte (gemäß Vorgabe in Apps/Frontend).
- **Backend**: Python FastAPI / Node.js (gemäß Vorgabe in Apps/Backend).

## 3. Design System & Style Guide
- [Hier trägt der Architekt das Farbkonzept, Hex-Codes und Schriftarten des Projekts ein]
- [Vorgaben zum CSS-Framework: z.B. Tailwind v4 custom theme]

## 4. API Contract & Schnittstellen
- **Automatische OpenAPI-Dokumentation**: Da das Backend auf FastAPI basiert, wird die Schnittstellen-Spezifikation (Endpoints, Payloads, Schemas und Pydantic-Modelle) vollständig automatisch generiert.
  - **Swagger UI**: Die interaktive API-Dokumentation ist lokal unter [http://localhost:8000/docs](http://localhost:8000/docs) erreichbar.
  - **Raw OpenAPI Schema**: Die maschinenlesbare Schnittstellenbeschreibung ist unter `http://localhost:8000/openapi.json` abrufbar.
- **Nutzung durch Agenten**: Nutze primär die automatisch generierten OpenAPI-Spezifikationen zur Code-Generierung und Schnittstellen-Verifikation, statt manuelle Listen im Repositorium zu pflegen.

## 5. Deployment & Localdev
- **Entwicklungs-Server**: Starte die gesamte Anwendung (Frontend & Backend) parallel aus dem Stammverzeichnis mittels:
  ```bash
  corepack enable
  pnpm install
  pnpm dev
  ```
- **Container-Builds (falls vorhanden)**:
  - Container können nativ über das Orchestrierungsskript gesteuert werden:
    ```bash
    chmod +x run-podman.sh
    ./run-podman.sh up      # Startet alle Container
    ./run-podman.sh logs    # Streamt Logs
    ./run-podman.sh down    # Stoppt alle Container
    ```
