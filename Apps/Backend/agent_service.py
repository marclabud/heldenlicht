import os
import json
import time
from datetime import datetime, timezone
from pydantic import ValidationError

# Internal Imports
from models import ExampleAIResponse
from llm_service import llm_provider

# =====================================================================
# ADK 2.0 Imports & Mock Fallback Layer
# =====================================================================
try:
    from google.adk.agents import Agent
    from google.adk.apps import App
    from google.adk.runners import InMemoryRunner
    HAS_GOOGLE_ADK = True
except ImportError:
    HAS_GOOGLE_ADK = False

if not HAS_GOOGLE_ADK:
    print("💡 [AgentService] Info: google-adk package not found. Activating Mock Layer for local development.")
    
    class Agent:
        def __init__(self, name, model, instruction, output_schema, output_key=None):
            self.name = name
            self.model = model
            self.instruction = instruction
            self.output_schema = output_schema
            self.output_key = output_key

    class App:
        def __init__(self, name, root_agent):
            self.name = name
            self.root_agent = root_agent

    class InMemoryRunner:
        def __init__(self, app):
            self.app = app

        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc_val, exc_tb):
            pass

        async def run_debug(self, prompt: str):
            # Return mocked execution events mapping Pydantic schema
            class MockEvent:
                def __init__(self, author: str, text: str, is_final: bool = False):
                    self.author = author
                    class MockContent:
                        class MockPart:
                            def __init__(self, txt: str):
                                self.text = txt
                        def __init__(self, txt: str):
                            self.parts = [MockPart(txt)]
                    self.content = MockContent(text)
                    self._is_final = is_final
                
                def is_final_response(self) -> bool:
                    return self._is_final

            mock_json_response = """{
                "summary": "Analysedaten erfolgreich verarbeitet.",
                "insights": [
                    "Das System läuft stabil im lokalen Mock-Modus.",
                    "Verbindung zum AI-Modell ist optimal konfiguriert.",
                    "Die Response-Struktur entspricht dem ExampleAIResponse Schema."
                ],
                "confidence_score": 0.95
            }"""
            
            return [
                MockEvent("system", "Inferenz gestartet..."),
                MockEvent("mock_agent", mock_json_response, is_final=True)
            ]

# =====================================================================
# 0. LLM CONFIGURATION & CONSTANTS
# =====================================================================

LLM_GEMINI_FLASH = "gemini-2.5-flash"
LLM_GEMINI_PRO = "gemini-2.5-pro"
LLM_DEFAULT = "default"

CHOSEN_LLM = LLM_GEMINI_FLASH
model_name = llm_provider.get_model(CHOSEN_LLM)

# =====================================================================
# 1. HELPER & UTILITY FUNCTIONS
# =====================================================================

def load_system_prompt() -> str:
    """Loads the system markdown instructions for the mock agent."""
    prompt_path = os.path.join(os.path.dirname(__file__), "prompts", "system_mock_agent.md")
    try:
        with open(prompt_path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        # Fallback to keep setup and dev environments running gracefully
        return (
            "Du bist ein strukturierter KI-Assistent. Analysiere die Eingabedaten "
            "und extrahiere Zusammenfassungen und Key Insights."
        )

def log_agent_run_to_audit_file(input_data: dict, output_data: dict, duration: float, success: bool, error_msg: str = None):
    """Audits agent execution details either locally or to Cloud Firestore."""
    audit_log = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "input_data": input_data,
        "output_data": output_data,
        "duration_seconds": round(duration, 3),
        "success": success,
        "error": error_msg
    }
    
    provider_name = os.getenv("DB_PROVIDER", "sqlite").lower()
    if provider_name == "firestore":
        try:
            from google.cloud import firestore
            db = firestore.Client()
            db.collection("agent_audit_logs").add(audit_log)
            print("💾 [Audit Log] Successfully written to Cloud Firestore collection 'agent_audit_logs'.")
            return
        except Exception as e:
            print(f"⚠️ [Audit Log] Failed to write to Firestore: {e}. Falling back to local file.")
            
    log_path = os.path.join(os.path.dirname(__file__), "mock_agent_audit.jsonl")
    try:
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(audit_log, ensure_ascii=False) + "\n")
        print(f"💾 [Audit Log] Successfully written to local file '{log_path}'.")
    except Exception as e:
        print(f"❌ [Audit Log] Failed to write to mock_agent_audit.jsonl: {e}")

# =====================================================================
# 2. GLOBAL ADK 2.0 DEFINITIONS (Crucial for the ADK Web UI)
# =====================================================================

mock_agent = Agent(
    name="mock_agent",
    model=model_name,
    instruction=load_system_prompt(),
    output_schema=ExampleAIResponse,
    output_key="example_response"
)

app = App(
    name="MockAgentApp",
    root_agent=mock_agent
)

# =====================================================================
# 3. RUNTIME PIPELINE (For API endpoints / local calls)
# =====================================================================

async def run_mock_agent(input_data: dict) -> ExampleAIResponse:
    """
    Executes the mock_agent pipeline with up to 3 self-correction iterations 
    if Pydantic JSON schema compliance fails.
    """
    prompt_user = json.dumps({"input_data": input_data}, ensure_ascii=False)
    
    print("\n--- DEBUG: USER PROMPT ---")
    print(prompt_user)
    print("--------------------------\n")
    
    start_time = time.perf_counter()
    max_retries = 3  
    current_attempt = 0
    current_prompt = prompt_user
    
    async with InMemoryRunner(app=app) as runner:
        while current_attempt <= max_retries:
            try:
                print(f"\n📢 [ADK 2.0] Durchlauf {current_attempt + 1} gestartet...")
                events = await runner.run_debug(current_prompt)
                
                print(f"📢 [ADK 2.0] Mock-Agent beendet - {len(events)} Events empfangen:")
                for idx, event in enumerate(events):
                    author = getattr(event, "author", "system/unknown")
                    is_final = event.is_final_response()
                    print(f"  🔹 [Event {idx+1}/{len(events)}] Quelle: '{author}' | Final: {is_final}")
                    
                    if event.content and event.content.parts:
                        for p_idx, part in enumerate(event.content.parts):
                            if hasattr(part, "text") and part.text:
                                text_preview = part.text.strip().replace('\n', ' ')
                                if len(text_preview) > 100:
                                    text_preview = text_preview[:100] + "..."
                                print(f"    ▪️ Part {p_idx+1} (Text): {text_preview}")
                            elif hasattr(part, "function_call") and part.function_call:
                                print(f"    ▪️ Part {p_idx+1} [TOOL CALL]: {part.function_call.name}")
                            elif hasattr(part, "function_response") and part.function_response:
                                print(f"    ▪️ Part {p_idx+1} [TOOL RESPONSE]: {part.function_response.name}")
                print("📢 [ADK 2.0] Tracing beendet.\n")
                
                final_text = ""
                for event in reversed(events):
                    if event.is_final_response() and event.content and event.content.parts:
                        for part in event.content.parts:
                            if part.text:
                                final_text = part.text
                                break
                        if final_text:
                            break
                
                if not final_text:
                    raise ValueError("No response received from Mock Agent.")
                
                agent_response = ExampleAIResponse.model_validate_json(final_text)
                
                # Normalize confidence score
                if agent_response.confidence_score > 1.0:
                    agent_response.confidence_score = agent_response.confidence_score / 100.0
                agent_response.confidence_score = min(max(agent_response.confidence_score, 0.0), 1.0)
                
                duration = time.perf_counter() - start_time
                log_agent_run_to_audit_file(input_data, agent_response.model_dump(), duration, True)
                
                print(f"✅ [ADK 2.0] Erfolgreiche Generierung und Validierung im Durchlauf {current_attempt + 1}!")
                return agent_response
                
            except (ValidationError, json.JSONDecodeError, ValueError, Exception) as error:
                current_attempt += 1
                duration = time.perf_counter() - start_time
                print(f"⚠️ [ADK 2.0] Validierungsfehler in Durchlauf {current_attempt}: {str(error)}")
                
                if current_attempt > max_retries:
                    log_agent_run_to_audit_file(
                        input_data, None, duration, False, 
                        f"Fehlgeschlagen nach {current_attempt} Versuchen. Letzter Fehler: {str(error)}"
                    )
                    raise Exception(f"Failed to validate agent response after maximum attempts: {str(error)}")
                
                current_prompt = (
                    f"Deine vorherige Antwort hat die Pydantic-Validierung nicht bestanden.\n\n"
                    f"❌ VALIDIERUNGSFEHLER:\n{str(error)}\n\n"
                    f"Bitte analysiere den Fehler, korrigiere deine Generierung und antworte erneut strictly "
                    f"im geforderten JSON-Format (ExampleAIResponse Schema)."
                )
