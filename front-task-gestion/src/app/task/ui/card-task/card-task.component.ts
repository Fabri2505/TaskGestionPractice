import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../utils/schema';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, CommonModule, Avatar],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() task!: Task;
  @Output() statusChanged = new EventEmitter<{taskId: number, newStatus: TaskStatus}>();

  getCardClass(): string {
    return `card-${this.task.status}`;
  }

  getStatusColor(): string {
    const colors = {
      'pendiente': '#f59e0b',
      'en_progreso': '#3b82f6',
      'completado': '#10b981'
    };
    return colors[this.task.status];
  }

  getStatusLabel(): string {
    const labels = {
      'pendiente': 'Pendiente',
      'en_progreso': 'En Progreso',
      'completado': 'Completado'
    };
    return labels[this.task.status];
  }

  getStatusSeverity(): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const severities = {
      'pendiente': 'warn' as const,
      'en_progreso': 'info' as const,
      'completado': 'success' as const
    };
    return severities[this.task.status];
  }

  getPriorityLabel(): string {
    const labels = {
      'low': 'Baja',
      'medium': 'Media',
      'high': 'Alta'
    };
    return this.task.priority ? labels[this.task.priority] : '';
  }

  getActionLabel(): string {
    return this.task.status === 'pendiente' ? 'Iniciar' : 'Completar';
  }

  getActionIcon(): string {
    return this.task.status === 'pendiente' ? 'pi pi-play' : 'pi pi-check';
  }

  getActionSeverity(): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    return this.task.status === 'pendiente' ? 'info' : 'success';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  isOverdue(): boolean {
    if (!this.task.dueDate || this.task.status === 'completado') return false;
    return new Date(this.task.dueDate) < new Date();
  }

  onStatusChange(): void {
    const statusFlow: Record<TaskStatus, TaskStatus> = {
      'pendiente': 'en_progreso',
      'en_progreso': 'completado',
      'completado': 'completado'
    };
    
    const newStatus = statusFlow[this.task.status];
    this.statusChanged.emit({ taskId: this.task.id, newStatus });
  }


}
