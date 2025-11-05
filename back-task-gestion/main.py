from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.routes import router as api_router

app_configs = {"title": "TASK-REAL-TIME", "version": "0.0.0.1"}
app = FastAPI(**app_configs)

# Lista de orÃ­genes permitidos
origins = ["http://localhost", "http://localhost:4200", "http://example.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite todas las URLs en la lista origins
    allow_credentials=True,
    allow_methods=["*"],    # Permite todos los mÃ©todos
    allow_headers=["*"],    # Permite todos los headers
    expose_headers=["*"]
)

maintenance_mode = False

@app.middleware("http")
async def maintenance_middleware(request: Request, call_next):
    # Rutas excluidas del modo mantenimiento
    excluded_paths = {"/admin/maintenance","/docs","/openapi.json"}
    
    # Si no estÃ¡ en mantenimiento o es una ruta excluida, continuar normal
    if not maintenance_mode or request.url.path in excluded_paths:
        return await call_next(request)
    
    # Si estÃ¡ en mantenimiento, devolver mensaje
    return JSONResponse(
        status_code=503,
        content={
            "message": "El servidor estÃ¡ en mantenimiento. Por favor, intente mÃ¡s tarde."
        }
    )

@app.post("/admin/maintenance")
async def toggle_maintenance(enable: bool):
    global maintenance_mode
    maintenance_mode = enable
    return {"maintenance_mode": maintenance_mode}

app.include_router(api_router, prefix="/api")