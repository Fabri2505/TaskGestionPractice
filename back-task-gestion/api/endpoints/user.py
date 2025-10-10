from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db
from controllers.user_controller import UserController
from schemas.user import UserRegister
from sqlalchemy.orm import Session
from dependencias import pwd_context
from services.user_service import UserService


router = APIRouter()

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db:Session=Depends(get_db)
):
    user_ctrl = UserController(db)
    user_serv = UserService(pwd_context)

    user = user_ctrl.get_user_by_email(form_data.username)

    if not user or not user_serv.verify_token_bcrypt_fixed(form_data.password, user.contra):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"message": "Login successful", "user": {"id": user.id, "nombre": user.nombre, "email": user.email}}

@router.post("/register")
async def register(user_register:UserRegister, db:Session=Depends(get_db)):

    user_ctrl = UserController(db)
    user_serv = UserService(pwd_context)

    contra = user_serv.hash_token_bcrypt_fixed(user_register.password)

    user_ctrl.register_user(
        nombre=user_register.nombre,
        email=user_register.email,
        hashed_password=contra
    )

    db.commit()
    return {"message": "User registered successfully"}