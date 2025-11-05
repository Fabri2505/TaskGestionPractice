from sqlalchemy import or_
from sqlalchemy.orm import Session
from models.task_model import Usuario
from schemas.user import UserFilter

class UserController:

    def __init__(self, db:Session) -> None:
        self.DB_TASK = db

    def register_user(self, nombre:str, email:str, hashed_password:str):

        new_user = Usuario(
            nombre=nombre,
            email=email,
            contra=hashed_password
        )
        self.DB_TASK.add(new_user)
        self.DB_TASK.flush()

        return new_user
    
    def get_user_by_email(self, email:str):
        return self.DB_TASK.query(Usuario).filter(Usuario.email == email).first()
    
    def get_all_users_by_filter(self, filtro:str, tipo_busqueda:UserFilter):
        filtro_like = f"%{filtro}%"
        if tipo_busqueda.value == "id":
            return self.DB_TASK.query(Usuario).filter(
                Usuario.id.ilike(filtro_like)
            ).all()
        elif tipo_busqueda.value == "nombre":
            return self.DB_TASK.query(Usuario).filter(
                Usuario.nombre.ilike(filtro_like)
            ).all()
    
    