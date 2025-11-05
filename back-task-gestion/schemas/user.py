from enum import Enum
from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    nombre: str
    email: EmailStr
    password: str

class UserFilter(Enum):
    nombre = "nombre"
    id = "id"

class UserChangePassword(BaseModel):
    old_password: str
    new_password: str