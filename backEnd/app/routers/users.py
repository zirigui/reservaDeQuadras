from fastapi import APIRouter, Depends, HTTPException
from .. import models, schemas, auth, database

router = APIRouter()

@router.post("/register")
def register(user: schemas.UserCreate):
    print(user)
    conn = database.get_db_connection()
    conn.set_client_encoding('UTF8')
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE username = %s", (user.username,))
            db_user = cur.fetchone()
            if db_user:
                raise HTTPException(status_code=400, detail="Usuário já existe")

            hashed_password = auth.hash_password(user.password)
            cur.execute("""
                INSERT INTO users (username, password, email, admin)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            """, (user.username, hashed_password, user.email, False))  # Sempre cadastra como usuário normal
            user_id = cur.fetchone()[0]
            conn.commit()

        return {"message": "Usuário criado com sucesso", "user_id": user_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao registrar usuário: {e}")
    finally:
        conn.close()

@router.post("/login")
def login(user: schemas.UserLogin):
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, username, password, email, admin FROM users WHERE username = %s", (user.email,))
            db_user = cur.fetchone()
            if not db_user or not auth.verify_password(user.password, db_user[3]):  # db_user[2] é a senha
                raise HTTPException(status_code=401, detail="Credenciais inválidas")

            token_data = {
                "sub": str(db_user[0]),   # id do usuário
                "admin": db_user[4]        # admin (booleano)
            }

            token = auth.create_access_token(token_data)
            return {"access_token": token, "token_type": "bearer", "admin": db_user[4]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no login: {e}")
    finally:
        conn.close()
