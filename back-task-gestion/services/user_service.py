from passlib.context import CryptContext


class UserService:

    def __init__(self, pwd_context:CryptContext) -> None:
        self.pwd_context = pwd_context

    def hash_token_bcrypt_fixed(self, clave: str) -> str:
        return self.pwd_context.hash(clave)

    def verify_token_bcrypt_fixed(self, clave: str, hashed_token: str) -> bool:
        return self.pwd_context.verify(clave, hashed_token)