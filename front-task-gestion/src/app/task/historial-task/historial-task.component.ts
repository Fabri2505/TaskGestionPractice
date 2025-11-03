import { Component } from '@angular/core';
import { CardTaskComponent } from '../ui/card-task/card-task.component';
import { Task } from '../utils/schema';

@Component({
  selector: 'app-historial-task',
  standalone: true,
  imports: [CardTaskComponent],
  templateUrl: './historial-task.component.html',
  styleUrl: './historial-task.component.css'
})
export class HistorialTaskComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Diseñar mockups',
      description: 'Crear los mockups del nuevo dashboard',
      status: 'pendiente',
      assignedTo: 'Juan Pérez',
      dueDate: new Date('2025-11-10')
    },
    {
      id: 2,
      title: 'Implementar API',
      description: 'Desarrollar endpoints REST para usuarios',
      status: 'en_progreso',
      assignedTo: 'María García',
      dueDate: new Date('2025-11-05')
    },
    {
      id: 3,
      title: 'Testing unitario',
      description: 'Escribir tests para el módulo de autenticación',
      status: 'completado',
      assignedTo: 'Carlos López'
    }
  ];
}
