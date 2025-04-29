from fastapi import APIRouter, Depends, HTTPException, Header
from .. import models, schemas, database
from ..auth import get_current_user

router = APIRouter()

@router.post("/reserva")
def criar_reserva(reserva: schemas.Reserva, current_user: dict = Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        # Inserindo a reserva no banco
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO reservas (quadra, horario, user_id) 
                VALUES (%s, %s, %s) RETURNING id
            """, (reserva.quadra, reserva.horario, current_user["id"]))
            reserva_id = cur.fetchone()[0]
            conn.commit()

        return {"message": "Reserva criada com sucesso", "reserva_id": reserva_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar reserva: {e}")
    finally:
        conn.close()
