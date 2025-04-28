import database 

def alterar_tabela_users():
    conn = database.get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("ALTER TABLE users ADD COLUMN admin BOOLEAN DEFAULT FALSE;")
            conn.commit()
            print(" Coluna 'admin' adicionada com sucesso!")
    except Exception as e:
        print(f" Erro ao alterar tabela: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    alterar_tabela_users()
