from fastapi import APIRouter

from api.endpoints import (user, task)


router = APIRouter()

router.include_router( user.router, prefix="/users",tags=["users"])
router.include_router( task.router, prefix="/tasks",tags=["tasks"])