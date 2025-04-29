from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    email: str
    password: str
    admin: bool

class Reserva(BaseModel):
    quadra: str
    horario: datetime
    user_id: int