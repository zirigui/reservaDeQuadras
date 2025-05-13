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

@router.get("/reservas")
def listar_reservas(current_user: dict = Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT r.id, r.horario, q.name as quadra, r.horario - NOW() > INTERVAL '24 hours' AS pode_cancelar
                FROM reservas r
                JOIN quadras q ON r.quadra = q.id
                WHERE r.user_id = %s
                and CURRENT_DATE >= r.horario
                ORDER BY r.horario
            """, (current_user["id"],))
            reservas = cur.fetchall()

        result = []
        for row in reservas:
            reserva_id, horario, quadra_nome, pode_cancelar = row

            horario_dt = horario

            result.append({
                "id": reserva_id,
                "date": horario_dt.strftime("%d/%m/%Y"),
                "time": horario_dt.strftime("%H:%M"),
                "court": quadra_nome,
                "canCancel": pode_cancelar
            })

        return result
    finally:
        conn.close()


@router.delete("/reserva/{reserva_id}")
def cancelar_reserva(reserva_id: int, current_user: dict = Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            # Verifica se a reserva é do usuário e se está no prazo para cancelar
            cur.execute("""
                SELECT horario FROM reservas 
                WHERE id = %s AND user_id = %s
            """, (reserva_id, current_user["id"]))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="Reserva não encontrada")

            from datetime import datetime, timedelta
            horario_dt = row[0]
            if horario_dt - datetime.now() < timedelta(hours=24):
                raise HTTPException(status_code=400, detail="Cancelamento indisponível (menos de 24h)")

            # Apaga a reserva
            cur.execute("DELETE FROM reservas WHERE id = %s", (reserva_id,))
            conn.commit()

        return {"message": "Reserva cancelada com sucesso"}
    finally:
        conn.close()

