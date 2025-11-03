import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Task } from '../../utils/schema';


@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() task!: Task;

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

  getCardBorderClass(): string {
    const classes = {
      'pendiente': 'border-l-4 border-yellow-400',
      'en_progreso': 'border-l-4 border-blue-400',
      'completado': 'border-l-4 border-green-400'
    };
    return classes[this.task.status];
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

  onStatusChange(): void {
    // Emite el evento o llama al servicio para cambiar el estado
    console.log('Cambiar estado de:', this.task.status);
  }


}
