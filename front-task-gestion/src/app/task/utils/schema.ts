export type TaskStatus = 'pendiente' | 'en_progreso' | 'completado';
export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo?: string;
    dueDate?: Date;
  }