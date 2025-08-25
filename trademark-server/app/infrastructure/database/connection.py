import os

from sqlmodel import SQLModel, create_engine, Session
from app.domain.models.trademark import Trademark
from dotenv import load_dotenv
# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URL de la base de datos desde las variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL")


engine = create_engine(
    DATABASE_URL
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session