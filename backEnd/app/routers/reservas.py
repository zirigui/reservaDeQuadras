from fastapi import APIRouter, Depends, HTTPException
from .. import models, schemas, database
from ..auth import get_current_user
from datetime import datetime, timedelta
from pytz import timezone

router = APIRouter()
br_tz = timezone("America/Sao_Paulo")

@router.post("/reserva")
def criar_reserva(reserva: schemas.Reserva, current_user: dict = Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            # Verifica se já existe reserva no mesmo horário
            cur.execute("""
                SELECT 1 FROM reservas
                WHERE quadra = %s AND horario = %s
            """, (reserva.quadra, reserva.horario))
            if cur.fetchone():
                raise HTTPException(status_code=409, detail="Horário já reservado para esta quadra")

        # Converte para timezone local (caso não tenha timezone)
        horario = reserva.horario
        if horario.tzinfo is None:
            horario = br_tz.localize(horario)
        else:
            horario = horario.astimezone(br_tz)

        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO reservas (quadra, horario, user_id) 
                VALUES (%s, %s, %s) RETURNING id
            """, (reserva.quadra, horario, current_user["id"]))
            reserva_id = cur.fetchone()[0]
            conn.commit()

        return {"message": "Reserva criada com sucesso", "reserva_id": reserva_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar reserva: {e}")
    finally:
        conn.close()

@router.get("/quadra/{quadra_id}/horarios_ocupados")
def horarios_ocupados(quadra_id: int, data: str, current_user: dict = Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT horario FROM reservas
                WHERE quadra = %s AND DATE(horario AT TIME ZONE 'America/Sao_Paulo') = %s
            """, (quadra_id, data))
            horarios = cur.fetchall()

        return [h[0].astimezone(br_tz).strftime("%H:%M") for h in horarios]
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
                AND r.horario >= CURRENT_DATE
                ORDER BY r.horario
            """, (current_user["id"],))
            reservas = cur.fetchall()

        result = []
        for row in reservas:
            reserva_id, horario, quadra_nome, pode_cancelar = row
            horario_dt = horario.astimezone(br_tz)

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
            cur.execute("""
                SELECT horario FROM reservas 
                WHERE id = %s AND user_id = %s
            """, (reserva_id, current_user["id"]))
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="Reserva não encontrada")

            horario_dt = row[0].astimezone(br_tz)
            if horario_dt - datetime.now(br_tz) < timedelta(hours=24):
                raise HTTPException(status_code=400, detail="Cancelamento indisponível (menos de 24h)")

            cur.execute("DELETE FROM reservas WHERE id = %s", (reserva_id,))
            conn.commit()

        return {"message": "Reserva cancelada com sucesso"}
    finally:
        conn.close()
