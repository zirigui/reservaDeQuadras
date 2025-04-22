import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
import os

# Função para criar a conexão
def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432",
            options="-c client_encoding=UTF8"  # Força a codificação para UTF-8
        )
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao conectar ao banco de dados: {e}")
