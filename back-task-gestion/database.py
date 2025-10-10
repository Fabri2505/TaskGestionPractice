from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")

# Crea el motor de SQLAlchemy con la URL de la base de datos especificada
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # Considera agregar pool_pre_ping=True para manejar automáticamente
    # la reconexión a la base de datos en caso de desconexión temporal.
    pool_pre_ping=True
)

# SessionLocal es una clase de sesión configurada para usar con la base de datos.
# Esto se utiliza para crear sesiones en tus rutas FastAPI cada vez que se necesita interactuar con la DB.
SessionLocal = sessionmaker(
    autocommit=False,  # No se compromete automáticamente tras cada operación
    autoflush=False,   # No se vacía automáticamente tras cada operación
    bind=engine        # Vincula el motor de base de datos (engine) a las sesiones creadas
)

# Base es una clase base de la cual derivarán todos tus modelos de base de datos
# que definen las tablas de SQLAlchemy.
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()