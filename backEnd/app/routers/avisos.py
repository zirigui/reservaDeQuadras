from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from .. import schemas, database
from ..auth import get_current_user

router = APIRouter(prefix="/avisos", tags=["avisos"])

@router.get("/", response_model=List[schemas.Aviso])
def list_avisos(current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, message FROM avisos ORDER BY created_at DESC")
        rows = cur.fetchall()
        return [{"id": r[0], "message": r[1]} for r in rows]
    finally:
        conn.close()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Aviso)
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

@router.put("/{aviso_id}", response_model=schemas.Aviso)
def update_aviso(aviso_id: int, aviso: schemas.AvisoCreate, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE avisos SET message=%s WHERE id=%s RETURNING id, message",
                (aviso.message, aviso_id)
            )
            updated = cur.fetchone()
            if not updated:
                raise HTTPException(status_code=404, detail="Aviso não encontrado")
            conn.commit()
        return {"id": updated[0], "message": updated[1]}
    finally:
        conn.close()

@router.delete("/{aviso_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_aviso(aviso_id: int, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM avisos WHERE id=%s", (aviso_id,))
            if cur.rowcount == 0:
                raise HTTPException(status_code=404, detail="Aviso não encontrado")
            conn.commit()
            return
    finally:
        conn.close()
