# quadras.py
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from .. import schemas, database
from ..auth import get_current_user

router = APIRouter(prefix="/quadras", tags=["quadras"])

@router.get("/", response_model=List[schemas.Quadra])
def list_quadras(current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, name, type FROM quadras ORDER BY id")
        rows = cur.fetchall()
        return [{"id": r[0], "name": r[1], "type": r[2]} for r in rows]
    finally:
        conn.close()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_quadra(q: schemas.QuadraCreate, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO quadras (name, type) VALUES (%s, %s) RETURNING id, name, type",
                (q.name, q.type)
            )
            new = cur.fetchone()
            conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@router.put("/{quadra_id}")
def update_quadra(quadra_id: int, q: schemas.QuadraCreate, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE quadras SET name=%s, type=%s WHERE id=%s RETURNING id, name, type",
                (q.name, q.type, quadra_id)
            )
            updated = cur.fetchone()
            if not updated:
                raise HTTPException(status_code=404, detail="Quadra não encontrada")
            conn.commit()
        return True
    finally:
        conn.close()

@router.delete("/{quadra_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_quadra(quadra_id: int, current_user=Depends(get_current_user)):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM quadras WHERE id=%s", (quadra_id,))
            if cur.rowcount == 0:
                raise HTTPException(status_code=404, detail="Quadra não encontrada")
            conn.commit()
            return True
    finally:
        conn.close()
