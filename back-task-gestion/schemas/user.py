from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    nombre: str
    email: EmailStr
    password: str