from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

# Enums para validación en Pydantic
class EstadoTareaEnum(str, Enum):
    pendiente = "pendiente"
    en_progreso = "en_progreso"
    completada = "completada"

class EstadoAsignacionEnum(str, Enum):
    pendiente = "pendiente"
    aceptada = "aceptada"
    rechazada = "rechazada"

# Schemas para Tareas
class TareaCreate(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    descripcion: Optional[str] = None
    usuarios_asignados: list[int] = Field(default_factory=list, description="IDs de usuarios a asignar")

class TareaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descripcion: Optional[str] = None
    estado: Optional[EstadoTareaEnum] = None

class TareaResponse(BaseModel):
    id: int
    titulo: str
    descripcion: Optional[str]
    estado: EstadoTareaEnum
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    usuario_id: int
    
    class Config:
        from_attributes = True
        use_enum_values = True

# Schemas para Historial
class HistorialTareaResponse(BaseModel):
    id: int
    tarea_id: int
    estado_nuevo: EstadoTareaEnum
    fecha_cambio: datetime
    
    class Config:
        from_attributes = True
        use_enum_values = True

# Schemas para Asignaciones
class AsignacionResponse(BaseModel):
    id: int
    tarea_id: int
    usuario_asignado_id: int
    estado: EstadoAsignacionEnum
    fecha_asignacion: datetime
    fecha_respuesta: Optional[datetime]
    
    class Config:
        from_attributes = True
        use_enum_values = True

class TareaConAsignacion(TareaResponse):
    estado_asignacion: Optional[EstadoAsignacionEnum] = None

# Schemas para Compartir
class CompartirTarea(BaseModel):
    usuario_compartido_id: int = Field(..., description="ID del usuario con quien compartir")

class TareaCompartidaResponse(BaseModel):
    id: int
    tarea_id: int
    usuario_propietario_id: int
    usuario_compartido_id: int
    fecha_compartida: datetime
    
    class Config:
        from_attributes = True