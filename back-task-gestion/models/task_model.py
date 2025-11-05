from datetime import datetime
import enum
from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship

from database import Base

class EstadoAsignacion(enum.Enum):
    pendiente = "pendiente"
    aceptada = "aceptada"
    rechazada = "rechazada"

class EstadoTarea(enum.Enum):
    completada = "completada"
    pendiente = "pendiente"
    en_progreso = "en_progreso"

class Usuario(Base):
    __tablename__ = 'usuarios'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True, index=True)
    contra = Column(String(255), nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.now, server_default=func.now())
    estado = Column(Boolean, default='True', nullable=False)
    
    # Relaciones
    tareas = relationship('Tarea', back_populates='usuario', cascade='all, delete-orphan')
    tareas_propias_compartidas = relationship(
        'TareaCompartida', 
        foreign_keys='TareaCompartida.usuario_propietario_id',
        back_populates='propietario',
        cascade='all, delete-orphan'
    )
    tareas_recibidas = relationship(
        'TareaCompartida',
        foreign_keys='TareaCompartida.usuario_compartido_id',
        back_populates='usuario_compartido',
        cascade='all, delete-orphan'
    )
    asignaciones = relationship('AsignacionTarea', back_populates='usuario_asignado', cascade='all, delete-orphan')

    
    def __repr__(self):
        return f"<Usuario(id={self.id}, nombre='{self.nombre}', email='{self.email}')>"


class Tarea(Base):
    __tablename__ = 'tareas'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False, index=True)
    titulo = Column(String(200), nullable=False)
    descripcion = Column(Text)
    estado = Column(Enum(EstadoTarea), default=EstadoTarea.pendiente, nullable=False, index=True)
    fecha_creacion = Column(DateTime, default=datetime.now, server_default=func.now())
    fecha_actualizacion = Column(
        DateTime, 
        default=datetime.now, 
        onupdate=datetime.now,
        server_default=func.now(),
        server_onupdate=func.now()
    )
    
    # Relaciones
    asignaciones = relationship('AsignacionTarea', back_populates='tarea', cascade='all, delete-orphan')
    usuario = relationship('Usuario', back_populates='tareas')
    historial = relationship('HistorialTarea', back_populates='tarea', cascade='all, delete-orphan')
    compartidas = relationship('TareaCompartida', back_populates='tarea', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"<Tarea(id={self.id}, titulo='{self.titulo}', estado={self.estado.value})>"


class HistorialTarea(Base):
    __tablename__ = 'historial_tareas'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tarea_id = Column(Integer, ForeignKey('tareas.id', ondelete='CASCADE'), nullable=False, index=True)
    estado_nuevo = Column(Enum(EstadoTarea), nullable=False)
    fecha_cambio = Column(DateTime, default=datetime.now, server_default=func.now(), index=True)
    
    # Relaciones
    tarea = relationship('Tarea', back_populates='historial')
    
    def __repr__(self):
        return f"<HistorialTarea(id={self.id}, tarea_id={self.tarea_id}, Nuevo estado: {self.estado_nuevo})>"


class TareaCompartida(Base):
    __tablename__ = 'tareas_compartidas'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tarea_id = Column(Integer, ForeignKey('tareas.id', ondelete='CASCADE'), nullable=False, index=True)
    usuario_propietario_id = Column(Integer, ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False, index=True)
    usuario_compartido_id = Column(Integer, ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False, index=True)
    fecha_compartida = Column(DateTime, default=datetime.now, server_default=func.now())
    
    # Relaciones
    tarea = relationship('Tarea', back_populates='compartidas')
    propietario = relationship(
        'Usuario',
        foreign_keys=[usuario_propietario_id],
        back_populates='tareas_propias_compartidas'
    )
    usuario_compartido = relationship(
        'Usuario',
        foreign_keys=[usuario_compartido_id],
        back_populates='tareas_recibidas'
    )
    
    def __repr__(self):
        return f"<TareaCompartida(id={self.id}, tarea_id={self.tarea_id}, propietario={self.usuario_propietario_id}, compartido_con={self.usuario_compartido_id})>"

class AsignacionTarea(Base):
    __tablename__ = 'asignaciones_tareas'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tarea_id = Column(Integer, ForeignKey('tareas.id', ondelete='CASCADE'), nullable=False, index=True)
    usuario_asignado_id = Column(Integer, ForeignKey('usuarios.id', ondelete='CASCADE'), nullable=False, index=True)
    estado = Column(Enum(EstadoAsignacion), default=EstadoAsignacion.pendiente, nullable=False, index=True)
    fecha_asignacion = Column(DateTime, default=datetime.now, server_default=func.now())
    fecha_respuesta = Column(DateTime, nullable=True)
    
    # Relaciones
    tarea = relationship('Tarea', back_populates='asignaciones')
    usuario_asignado = relationship('Usuario', back_populates='asignaciones')
    
    def aceptar(self):
        """Método para aceptar una asignación"""
        self.estado = EstadoAsignacion.aceptada
        self.fecha_respuesta = datetime.now()
    
    def rechazar(self):
        """Método para rechazar una asignación"""
        self.estado = EstadoAsignacion.rechazada
        self.fecha_respuesta = datetime.now()
    
    def __repr__(self):
        return f"<AsignacionTarea(id={self.id}, tarea_id={self.tarea_id}, usuario={self.usuario_asignado_id}, estado={self.estado.value})>"
