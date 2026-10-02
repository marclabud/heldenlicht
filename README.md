# GitMonorepo Blueprint: Nuxt 4, Tailwind v4 & FastAPI (Google ADK 2.0)

Ein **standardisiertes Git-Starter-Template** für die moderne Fullstack-Entwicklung. Dieses Monorepo ist speziell darauf ausgelegt, dass sich generative AI-Entwickler-Agenten (wie **Antigravity 2.0**) innerhalb von Minuten autonom zurechtfinden und neue Funktionen fehlerfrei implementieren können.

---

## 🚀 Key Features

*   📦 **pnpm Workspaces**: Saubere Monorepo-Verwaltung gepinnt auf `pnpm@10.33.0` über Corepack.
*   🎨 **Modernes Frontend**: Nuxt 4 (Vue 3, TypeScript), Tailwind CSS v4, `@nuxt/ui` v4 und `@nuxtjs/seo`.
*   🔌 **Elegantes Backend**: Python 3.13, FastAPI und die native Integration des **Google Agent Development Kit (ADK) 2.0**.
*   ⚙️ **Agenten-Konfiguration**: Der Mock-Agent im Backend wird flexibel über den System-Prompt in `Apps/Backend/prompts/system_mock_agent.md` gesteuert und konfiguriert.
*   🤖 **AI Onboarding Ready**: Feste Pfade und standardisierte Schnittstellen-Verträge ermöglichen reibungsloses agentenbasiertes Coding.
*   ✨ **Premium Design System**: Vordefinierte Design-Tokens (Warm Off-White Sand) direkt im Tailwind CSS v4 `@theme` eingebettet.

---

## 📂 Verzeichnisstruktur

```text
agent-nuxt4-tw4-blueprint/
├── Apps/
│   ├── Frontend/             # Nuxt 4 & Tailwind v4
│   └── Backend/              # Python FastAPI (Google ADK 2.0)
│       ├── main.py           # FastAPI Web Server Entrypoint
│       ├── agent_service.py  # ADK Agent Definition & Inference Loop
│       ├── llm_service.py    # LLMProvider Model Resolver
│       ├── models.py         # Pydantic Schemas (ExampleAIResponse, etc.)
│       └── prompts/          # System-Prompts für den Agenten (z.B. system_mock_agent.md)
├── specs/
│   └── business/
│       └── business-spec.md  # Fachliche Anforderungen (Single Source of Truth)
├── docs/
│   └── Antigravity_Agent_Context.md # Technisches Handbuch & Onboarding für Agenten
├── package.json              # Globale Scripts & Corepack Pinning
├── pnpm-workspace.yaml       # pnpm Workspace-Verbindungen
└── README.md                 # Diese Dokumentation
```

---

## 🛠️ Installation & Lokale Entwicklung

### Voraussetzungen
*   **Node.js**: `>=24.0.0`
*   **pnpm**: `>=10.33.0` (über Corepack)
*   **Python**: `>=3.13`
*   **Gemini API Key**: In `Apps/Backend/.env` als `GEMINI_API_KEY` hinterlegt.

### 1. Abhängigkeiten installieren
Führe diesen Befehl im Stammverzeichnis aus, um Corepack zu aktivieren und die Node-Abhängigkeiten in allen Workspaces zu installieren:
```bash
corepack enable
pnpm install
```

Richte anschließend das Python 3.13-Backend-Environment ein:
```bash
pnpm setup:backend
```
*(Alternativ manuell: `cd Apps/Backend && uv venv .venv && uv pip install -r requirements.txt`)*

### 2. Umgebungsvariablen konfigurieren
Kopiere die Vorlage in `Apps/Backend/.env.example` nach `Apps/Backend/.env` und trage deinen `GEMINI_API_KEY` ein:
```bash
cp Apps/Backend/.env.example Apps/Backend/.env
```

### 3. Entwicklungs-Server starten
Starte sowohl das Frontend (Port `3000`) als auch das Backend (Port `8000`) parallel über das globale Steuerungsskript:
```bash
pnpm dev
```

*   **Frontend**: [http://localhost:3000](http://localhost:3000)
*   **Backend API**: [http://localhost:8000](http://localhost:8000) (Swagger UI unter `/docs`)

---

## 🤖 Der goldene Pfad für autonome Agenten

1.  **Spezifikation definieren**: Befülle [specs/business/business-spec.md](specs/business/business-spec.md) mit deinen fachlichen Anforderungen und ASCII-Mockups.
2.  **API Contracts festlegen**: Nutze FastAPIs automatisch generierte OpenAPI-Dokumentation (Swagger UI unter `http://localhost:8000/docs`), um Schnittstellen-Verträge und Pydantic-Modelle dynamisch zu definieren, und hinterlege ergänzende Style-Tokens in [docs/Antigravity_Agent_Context.md](docs/Antigravity_Agent_Context.md).
3.  **Agenten starten**: Übergib das Repository an den **Antigravity 2.0-Agenten**. Er liest die Leitfäden, versteht die Architektur und beginnt autonom mit dem Bau der App!

---

## 🎨 Premium Off-White Sand Palette (Tailwind CSS v4)

Das Frontend liefert standardmäßig ein modernes, harmonisches Farbthema mit. Die CSS-Variablen sind direkt in [Apps/Frontend/assets/css/main.css](Apps/Frontend/assets/css/main.css) konfiguriert:

*   `primary` (`#D84C3F`): Terrakotta / Soft Red (Signalfarbe)
*   `secondary` (`#6BA368`): Soft Green (Erfolgsmeldungen / Indikatoren)
*   `accent` (`#F4A261`): Warm Orange (AI Insights / Highlights)
*   `background` (`#F7F5F2`): Premium Off-White Sand
*   `surface` (`#FFFFFF`): Reines Weiß für Cards und Panels
*   `text` (`#1F1F1F`): Tiefes Anthrazit für höchste Lesbarkeit

---

## 🐳 Container-Orchestrierung mit Podman

Das Template enthält das native Orchestrierungs-Skript `run-podman.sh`. Hiermit lassen sich beide Applikations-Container sauber bauen und über ein gemeinsames Podman-Netzwerk verknüpfen:

```bash
# Skript ausführbar machen
chmod +x run-podman.sh

# Bilder bauen und Container starten
./run-podman.sh up

# Logs beider Services streamen
./run-podman.sh logs

# Status der Container prüfen
./run-podman.sh status

# Container stoppen & Ressourcen aufräumen
./run-podman.sh down
```

