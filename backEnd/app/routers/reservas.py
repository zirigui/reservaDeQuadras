from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from .. import models, schemas, database, auth
from typing import Optional

router = APIRouter()

@router.post("/reserva")
def criar_reserva(reserva: schemas.ReservaCreate, user=Depends()):
    conn = database.get_db_connection()
    try:
        # Inserindo a reserva no banco
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO reservas (quadra, horario, user_id) 
                VALUES (%s, %s, %s) RETURNING id
            """, (reserva.quadra, reserva.horario, user.id))
            reserva_id = cur.fetchone()[0]
            conn.commit()

        return {"message": "Reserva criada com sucesso", "reserva_id": reserva_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar reserva: {e}")
    finally:
        conn.close()
