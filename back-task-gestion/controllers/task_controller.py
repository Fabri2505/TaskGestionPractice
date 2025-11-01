from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.task_model import (
    Tarea, 
    AsignacionTarea, 
    TareaCompartida, 
    HistorialTarea,
    EstadoAsignacion, 
    EstadoTarea,
    Usuario
)
from typing import Optional, List
from datetime import datetime

class TaskController:
    
    def __init__(self, db: Session) -> None:
        self.DB_TASK = db
    
    # CRUD Básico
    def create_task(self, usuario_id: int, titulo: str, descripcion: Optional[str] = None) -> Tarea:
        """Crear una nueva tarea"""
        tarea = Tarea(
            usuario_id=usuario_id,
            titulo=titulo,
            descripcion=descripcion,
            estado=EstadoTarea.pendiente
        )
        self.DB_TASK.add(tarea)
        self.DB_TASK.commit()
        self.DB_TASK.refresh(tarea)
        
        # Registrar en historial
        self._registrar_cambio_estado(tarea.id, EstadoTarea.pendiente)
        
        return tarea
    
    def get_task_by_id(self, tarea_id: int) -> Optional[Tarea]:
        """Obtener tarea por ID"""
        return self.DB_TASK.query(Tarea).filter(Tarea.id == tarea_id).first()
    
    def get_tasks_by_user(self, usuario_id: int) -> List[Tarea]:
        """Obtener todas las tareas creadas por un usuario"""
        return self.DB_TASK.query(Tarea).filter(Tarea.usuario_id == usuario_id).all()
    
    def update_task(self, tarea_id: int, titulo: Optional[str] = None, 
                   descripcion: Optional[str] = None, estado: Optional[EstadoTarea] = None) -> Optional[Tarea]:
        """Actualizar una tarea"""
        tarea = self.get_task_by_id(tarea_id)
        if not tarea:
            return None
        
        if titulo is not None:
            tarea.titulo = titulo
        if descripcion is not None:
            tarea.descripcion = descripcion
        if estado is not None and tarea.estado != estado:
            estado_anterior = tarea.estado
            tarea.estado = estado
            # Registrar cambio de estado en historial
            self._registrar_cambio_estado(tarea_id, estado)
        
        self.DB_TASK.commit()
        self.DB_TASK.refresh(tarea)
        return tarea
    
    def delete_task(self, tarea_id: int) -> bool:
        """Eliminar una tarea"""
        tarea = self.get_task_by_id(tarea_id)
        if not tarea:
            return False
        
        self.DB_TASK.delete(tarea)
        self.DB_TASK.commit()
        return True
    
    def _registrar_cambio_estado(self, tarea_id: int, estado_nuevo: EstadoTarea) -> None:
        """Registrar un cambio de estado en el historial"""
        historial = HistorialTarea(
            tarea_id=tarea_id,
            estado_nuevo=estado_nuevo
        )
        self.DB_TASK.add(historial)
        self.DB_TASK.commit()
    
    def get_task_history(self, tarea_id: int) -> List[HistorialTarea]:
        """Obtener el historial de cambios de una tarea"""
        return self.DB_TASK.query(HistorialTarea).filter(
            HistorialTarea.tarea_id == tarea_id
        ).order_by(HistorialTarea.fecha_cambio.desc()).all()
    
    def get_tasks_by_estado(self, usuario_id: int, estado: EstadoTarea) -> List[Tarea]:
        """Obtener tareas de un usuario filtradas por estado"""
        return self.DB_TASK.query(Tarea).filter(
            and_(
                Tarea.usuario_id == usuario_id,
                Tarea.estado == estado
            )
        ).all()
    
    # Asignaciones
    def assign_task_to_users(self, tarea_id: int, usuarios_ids: List[int]) -> List[AsignacionTarea]:
        """Asignar tarea a múltiples usuarios"""
        asignaciones = []
        for usuario_id in usuarios_ids:
            # Verificar que el usuario existe
            usuario = self.DB_TASK.query(Usuario).filter(Usuario.id == usuario_id).first()
            if not usuario:
                continue
            
            # Verificar que no exista ya una asignación
            asignacion_existente = self.DB_TASK.query(AsignacionTarea).filter(
                and_(
                    AsignacionTarea.tarea_id == tarea_id,
                    AsignacionTarea.usuario_asignado_id == usuario_id
                )
            ).first()
            
            if asignacion_existente:
                continue
            
            asignacion = AsignacionTarea(
                tarea_id=tarea_id,
                usuario_asignado_id=usuario_id,
                estado=EstadoAsignacion.pendiente
            )
            self.DB_TASK.add(asignacion)
            asignaciones.append(asignacion)
        
        self.DB_TASK.commit()
        return asignaciones
    
    def get_pending_assignments(self, usuario_id: int) -> List[AsignacionTarea]:
        """Obtener asignaciones pendientes de un usuario"""
        return self.DB_TASK.query(AsignacionTarea).filter(
            and_(
                AsignacionTarea.usuario_asignado_id == usuario_id,
                AsignacionTarea.estado == EstadoAsignacion.pendiente
            )
        ).all()
    
    def get_accepted_tasks(self, usuario_id: int) -> List[Tarea]:
        """Obtener tareas aceptadas por un usuario"""
        return self.DB_TASK.query(Tarea).join(
            AsignacionTarea
        ).filter(
            and_(
                AsignacionTarea.usuario_asignado_id == usuario_id,
                AsignacionTarea.estado == EstadoAsignacion.aceptada
            )
        ).all()
    
    def get_rejected_assignments(self, usuario_id: int) -> List[AsignacionTarea]:
        """Obtener asignaciones rechazadas de un usuario"""
        return self.DB_TASK.query(AsignacionTarea).filter(
            and_(
                AsignacionTarea.usuario_asignado_id == usuario_id,
                AsignacionTarea.estado == EstadoAsignacion.rechazada
            )
        ).all()
    
    def get_all_assignments(self, usuario_id: int) -> List[AsignacionTarea]:
        """Obtener todas las asignaciones de un usuario"""
        return self.DB_TASK.query(AsignacionTarea).filter(
            AsignacionTarea.usuario_asignado_id == usuario_id
        ).all()
    
    def accept_assignment(self, asignacion_id: int) -> Optional[AsignacionTarea]:
        """Aceptar una asignación"""
        asignacion = self.DB_TASK.query(AsignacionTarea).filter(
            AsignacionTarea.id == asignacion_id
        ).first()
        
        if not asignacion:
            return None
        
        asignacion.aceptar()
        self.DB_TASK.commit()
        self.DB_TASK.refresh(asignacion)
        return asignacion
    
    def reject_assignment(self, asignacion_id: int) -> Optional[AsignacionTarea]:
        """Rechazar una asignación"""
        asignacion = self.DB_TASK.query(AsignacionTarea).filter(
            AsignacionTarea.id == asignacion_id
        ).first()
        
        if not asignacion:
            return None
        
        asignacion.rechazar()
        self.DB_TASK.commit()
        self.DB_TASK.refresh(asignacion)
        return asignacion
    
    # Compartir tareas
    def share_task(self, tarea_id: int, usuario_propietario_id: int, 
                   usuario_compartido_id: int) -> Optional[TareaCompartida]:
        """Compartir una tarea con otro usuario"""
        # Verificar que la tarea existe y pertenece al propietario
        tarea = self.DB_TASK.query(Tarea).filter(
            and_(
                Tarea.id == tarea_id,
                Tarea.usuario_id == usuario_propietario_id
            )
        ).first()
        
        if not tarea:
            return None
        
        # Verificar que el usuario a compartir existe
        usuario_compartido = self.DB_TASK.query(Usuario).filter(
            Usuario.id == usuario_compartido_id
        ).first()
        
        if not usuario_compartido:
            return None
        
        # Verificar que no esté ya compartida
        compartida_existente = self.DB_TASK.query(TareaCompartida).filter(
            and_(
                TareaCompartida.tarea_id == tarea_id,
                TareaCompartida.usuario_compartido_id == usuario_compartido_id
            )
        ).first()
        
        if compartida_existente:
            return compartida_existente
        
        tarea_compartida = TareaCompartida(
            tarea_id=tarea_id,
            usuario_propietario_id=usuario_propietario_id,
            usuario_compartido_id=usuario_compartido_id
        )
        
        self.DB_TASK.add(tarea_compartida)
        self.DB_TASK.commit()
        self.DB_TASK.refresh(tarea_compartida)
        return tarea_compartida
    
    def get_shared_tasks(self, usuario_id: int) -> List[Tarea]:
        """Obtener tareas compartidas con un usuario"""
        return self.DB_TASK.query(Tarea).join(
            TareaCompartida
        ).filter(
            TareaCompartida.usuario_compartido_id == usuario_id
        ).all()
    
    def unshare_task(self, tarea_id: int, usuario_compartido_id: int) -> bool:
        """Dejar de compartir una tarea con un usuario"""
        tarea_compartida = self.DB_TASK.query(TareaCompartida).filter(
            and_(
                TareaCompartida.tarea_id == tarea_id,
                TareaCompartida.usuario_compartido_id == usuario_compartido_id
            )
        ).first()
        
        if not tarea_compartida:
            return False
        
        self.DB_TASK.delete(tarea_compartida)
        self.DB_TASK.commit()
        return True
    
    def get_all_user_tasks(self, usuario_id: int) -> dict:
        """Obtener todas las tareas relacionadas con un usuario"""
        return {
            "tareas_creadas": self.get_tasks_by_user(usuario_id),
            "tareas_aceptadas": self.get_accepted_tasks(usuario_id),
            "tareas_compartidas": self.get_shared_tasks(usuario_id),
            "asignaciones_pendientes": self.get_pending_assignments(usuario_id)
        }