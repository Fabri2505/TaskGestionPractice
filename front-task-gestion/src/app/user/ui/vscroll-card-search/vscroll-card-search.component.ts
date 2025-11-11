import { Component, Input } from '@angular/core';
import { ScrollerModule } from "primeng/scroller";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { Usuario } from '../../utils/schemas';

@Component({
  selector: 'app-vscroll-card-search',
  standalone: true,
  imports: [ScrollerModule, TagModule, ButtonModule],
  templateUrl: './vscroll-card-search.component.html',
  styleUrl: './vscroll-card-search.component.css'
})
export class VscrollCardSearchComponent {
  @Input() usuarios: Usuario[] = [];

  adjuntarTarea(usuario: Usuario, event: Event) {
    event.stopPropagation();
    console.log('Adjuntar tarea a:', usuario);
    // Aquí implementarías la lógica para adjuntar una tarea
  }

  compartirTarea(usuario: Usuario, event: Event) {
    event.stopPropagation();
    console.log('Compartir tarea con:', usuario);
    // Aquí implementarías la lógica para compartir una tarea
  }

  getSeverity(estado: string): 'success' | 'danger' {
    return estado === 'activo' ? 'success' : 'danger';
  }

  getAvatarColor(index: number): string {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  }


}
