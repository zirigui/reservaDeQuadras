from fastapi import FastAPI
from app.routers import users, reservas, teste
from app.database import get_db_connection

app = FastAPI()

app.include_router(users.router, prefix="/auth")
app.include_router(reservas.router)

@app.get("/")
def read_root():
    return {"message": "API da reserva de quadras funcionando!"}

app.include_router(teste.router)