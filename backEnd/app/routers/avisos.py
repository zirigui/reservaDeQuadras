from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from .. import schemas, database
from ..auth import get_current_user

router = APIRouter(prefix="/avisos", tags=["avisos"])

@router.get("/", response_model=List[schemas.Aviso])
def list_avisos():
    conn = database.get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, message FROM avisos ORDER BY created_at DESC")
        rows = cur.fetchall()
        return [{"id": r[0], "message": r[1]} for r in rows]
    finally:
        conn.close()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_aviso(aviso: schemas.AvisoCreate, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO avisos (message) VALUES (%s) RETURNING id, message",
                (aviso.message,)
            )
            new = cur.fetchone()
            conn.commit()
        return {"id": new[0], "message": new[1]}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
