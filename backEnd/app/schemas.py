from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    email: str
    password: str

class Reserva(BaseModel):
    quadra: int
    horario: datetime

class QuadraBase(BaseModel):
    name: str
    type: str

class QuadraCreate(QuadraBase):
    pass

class Quadra(QuadraBase):
    id: int
    class Config:
        orm_mode = True

class AvisoCreate(BaseModel):
    message: str

class Aviso(AvisoCreate):
    id: int
