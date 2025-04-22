from fastapi import FastAPI
from app.routers import users, reservas

app = FastAPI()

app.include_router(users.router, prefix="/auth")
app.include_router(reservas.router)
