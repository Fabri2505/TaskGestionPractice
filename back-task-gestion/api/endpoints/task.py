from typing import List
from fastapi import APIRouter, Depends, status, HTTPException

from controllers.task_controller import TaskController
from database import get_db
from models.task_model import EstadoTarea
from schemas.task import (
    AsignacionResponse, 
    CompartirTarea, 
    TareaCompartidaResponse, 
    TareaCreate, 
    TareaResponse, 
    TareaUpdate,
    HistorialTareaResponse
)
from sqlalchemy.orm import Session


router = APIRouter()

@router.post("/", response_model=TareaResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    tarea: TareaCreate,
    usuario_id: int,  # En producción esto vendría del token JWT
    db: Session = Depends(get_db)
):
    """Crear una nueva tarea y asignarla a usuarios"""
    task_ctrl = TaskController(db)
    
    # Crear la tarea
    nueva_tarea = task_ctrl.create_task(
        usuario_id=usuario_id,
        titulo=tarea.titulo,
        descripcion=tarea.descripcion
    )
    
    # Asignar a usuarios si se especificaron
    if tarea.usuarios_asignados:
        task_ctrl.assign_task_to_users(nueva_tarea.id, tarea.usuarios_asignados)
    
    return nueva_tarea


@router.get("/{tarea_id}", response_model=TareaResponse)
async def get_task(
    tarea_id: int,
    db: Session = Depends(get_db)
):
    """Obtener una tarea por ID"""
    task_ctrl = TaskController(db)
    tarea = task_ctrl.get_task_by_id(tarea_id)
    
    if not tarea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarea no encontrada"
        )
    
    return tarea


@router.get("/user/{usuario_id}", response_model=List[TareaResponse])
async def get_user_tasks(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener todas las tareas creadas por un usuario"""
    task_ctrl = TaskController(db)
    tareas = task_ctrl.get_tasks_by_user(usuario_id)
    return tareas


@router.get("/user/{usuario_id}/estado/{estado}", response_model=List[TareaResponse])
async def get_user_tasks_by_estado(
    usuario_id: int,
    estado: EstadoTarea,
    db: Session = Depends(get_db)
):
    """Obtener tareas de un usuario filtradas por estado (pendiente, en_progreso, completada)"""
    task_ctrl = TaskController(db)
    tareas = task_ctrl.get_tasks_by_estado(usuario_id, estado)
    return tareas


@router.put("/{tarea_id}", response_model=TareaResponse)
async def update_task(
    tarea_id: int,
    tarea_update: TareaUpdate,
    db: Session = Depends(get_db)
):
    """Actualizar una tarea"""
    task_ctrl = TaskController(db)
    
    tarea = task_ctrl.update_task(
        tarea_id=tarea_id,
        titulo=tarea_update.titulo,
        descripcion=tarea_update.descripcion,
        estado=tarea_update.estado
    )
    
    if not tarea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarea no encontrada"
        )
    
    return tarea


@router.delete("/{tarea_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    tarea_id: int,
    db: Session = Depends(get_db)
):
    """Eliminar una tarea"""
    task_ctrl = TaskController(db)
    
    if not task_ctrl.delete_task(tarea_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarea no encontrada"
        )
    
    return None


# ==================== HISTORIAL ====================

@router.get("/{tarea_id}/historial", response_model=List[HistorialTareaResponse])
async def get_task_history(
    tarea_id: int,
    db: Session = Depends(get_db)
):
    """Obtener el historial de cambios de estado de una tarea"""
    task_ctrl = TaskController(db)
    
    # Verificar que la tarea existe
    tarea = task_ctrl.get_task_by_id(tarea_id)
    if not tarea:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarea no encontrada"
        )
    
    historial = task_ctrl.get_task_history(tarea_id)
    return historial


# ==================== ASIGNACIONES ====================

@router.get("/assignments/pending/{usuario_id}", response_model=List[AsignacionResponse])
async def get_pending_assignments(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener asignaciones pendientes de un usuario"""
    task_ctrl = TaskController(db)
    asignaciones = task_ctrl.get_pending_assignments(usuario_id)
    return asignaciones


@router.get("/assignments/rejected/{usuario_id}", response_model=List[AsignacionResponse])
async def get_rejected_assignments(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener asignaciones rechazadas de un usuario"""
    task_ctrl = TaskController(db)
    asignaciones = task_ctrl.get_rejected_assignments(usuario_id)
    return asignaciones


@router.get("/assignments/all/{usuario_id}", response_model=List[AsignacionResponse])
async def get_all_assignments(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener todas las asignaciones de un usuario (pendientes, aceptadas, rechazadas)"""
    task_ctrl = TaskController(db)
    asignaciones = task_ctrl.get_all_assignments(usuario_id)
    return asignaciones


@router.post("/assignments/{asignacion_id}/accept", response_model=AsignacionResponse)
async def accept_assignment(
    asignacion_id: int,
    db: Session = Depends(get_db)
):
    """Aceptar una asignación de tarea"""
    task_ctrl = TaskController(db)
    
    asignacion = task_ctrl.accept_assignment(asignacion_id)
    
    if not asignacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Asignación no encontrada"
        )
    
    return asignacion


@router.post("/assignments/{asignacion_id}/reject", response_model=AsignacionResponse)
async def reject_assignment(
    asignacion_id: int,
    db: Session = Depends(get_db)
):
    """Rechazar una asignación de tarea"""
    task_ctrl = TaskController(db)
    
    asignacion = task_ctrl.reject_assignment(asignacion_id)
    
    if not asignacion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Asignación no encontrada"
        )
    
    return asignacion


@router.get("/assignments/accepted/{usuario_id}", response_model=List[TareaResponse])
async def get_accepted_tasks(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener tareas aceptadas por un usuario"""
    task_ctrl = TaskController(db)
    tareas = task_ctrl.get_accepted_tasks(usuario_id)
    return tareas


# ==================== COMPARTIR TAREAS ====================

@router.post("/{tarea_id}/share", response_model=TareaCompartidaResponse)
async def share_task(
    tarea_id: int,
    compartir_data: CompartirTarea,
    usuario_propietario_id: int,  # En producción esto vendría del token JWT
    db: Session = Depends(get_db)
):
    """Compartir una tarea con otro usuario"""
    task_ctrl = TaskController(db)
    
    tarea_compartida = task_ctrl.share_task(
        tarea_id=tarea_id,
        usuario_propietario_id=usuario_propietario_id,
        usuario_compartido_id=compartir_data.usuario_compartido_id
    )
    
    if not tarea_compartida:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo compartir la tarea. Verifica que la tarea existe y te pertenece."
        )
    
    return tarea_compartida


@router.delete("/{tarea_id}/unshare/{usuario_compartido_id}", status_code=status.HTTP_204_NO_CONTENT)
async def unshare_task(
    tarea_id: int,
    usuario_compartido_id: int,
    db: Session = Depends(get_db)
):
    """Dejar de compartir una tarea con un usuario"""
    task_ctrl = TaskController(db)
    
    if not task_ctrl.unshare_task(tarea_id, usuario_compartido_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No se encontró la tarea compartida"
        )
    
    return None


@router.get("/shared/{usuario_id}", response_model=List[TareaResponse])
async def get_shared_tasks(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """Obtener tareas compartidas con un usuario"""
    task_ctrl = TaskController(db)
    tareas = task_ctrl.get_shared_tasks(usuario_id)
    return tareas


# ==================== VISTA CONSOLIDADA ====================

@router.get("/all/{usuario_id}")
async def get_all_user_tasks(
    usuario_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener todas las tareas relacionadas con un usuario:
    - Tareas creadas
    - Tareas aceptadas (asignadas a él)
    - Tareas compartidas con él
    - Asignaciones pendientes
    """
    task_ctrl = TaskController(db)
    todas_las_tareas = task_ctrl.get_all_user_tasks(usuario_id)
    
    return {
        "tareas_creadas": [
            {
                "id": t.id,
                "titulo": t.titulo,
                "descripcion": t.descripcion,
                "estado": t.estado.value,
                "fecha_creacion": t.fecha_creacion,
                "fecha_actualizacion": t.fecha_actualizacion
            } for t in todas_las_tareas["tareas_creadas"]
        ],
        "tareas_aceptadas": [
            {
                "id": t.id,
                "titulo": t.titulo,
                "descripcion": t.descripcion,
                "estado": t.estado.value,
                "fecha_creacion": t.fecha_creacion,
                "fecha_actualizacion": t.fecha_actualizacion
            } for t in todas_las_tareas["tareas_aceptadas"]
        ],
        "tareas_compartidas": [
            {
                "id": t.id,
                "titulo": t.titulo,
                "descripcion": t.descripcion,
                "estado": t.estado.value,
                "fecha_creacion": t.fecha_creacion,
                "fecha_actualizacion": t.fecha_actualizacion
            } for t in todas_las_tareas["tareas_compartidas"]
        ],
        "asignaciones_pendientes": [
            {
                "id": a.id,
                "tarea_id": a.tarea_id,
                "estado": a.estado.value,
                "fecha_asignacion": a.fecha_asignacion,
                "fecha_respuesta": a.fecha_respuesta
            } for a in todas_las_tareas["asignaciones_pendientes"]
        ]
    }