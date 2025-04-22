from fastapi import APIRouter
from app.database import get_db_connection

router = APIRouter()

@router.get("/teste-db")
def testar_conexao():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        result = cur.fetchone()
        cur.close()
        conn.close()
        return {"mensagem": "Conexão com o banco bem-sucedida!", "resultado": result}
    except Exception as e:
        return {"erro": str(e)}
