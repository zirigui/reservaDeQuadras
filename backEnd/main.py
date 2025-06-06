from fastapi import FastAPI
from app.routers import users, reservas, teste, admin, avisos
from app.database import get_db_connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite apenas esse IP
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(users.router)
app.include_router(reservas.router)
app.include_router(admin.router)
app.include_router(avisos.router)

@app.get("/")
def read_root():
    return {"message": "API da reserva de quadras funcionando!"}

app.include_router(teste.router)