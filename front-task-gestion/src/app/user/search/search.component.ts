import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollerModule } from 'primeng/scroller';
import { CardModule } from 'primeng/card';

interface Usuario {
  id: number;
  codigo: string;
  nombre: string;
  email: string;
  departamento: string;
  estado: 'activo' | 'inactivo';
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ScrollerModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    TagModule,
    AvatarModule,
    SkeletonModule

  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  ngOnInit() {
    // Simular carga de datos
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    
    // Simulamos una carga asíncrona con más usuarios para demostrar el virtual scroll
    setTimeout(() => {
      this.usuarios = this.generateMockUsers(50);
      this.usuariosFiltrados = [...this.usuarios];
      this.loading = false;
    }, 500);
  }

  generateMockUsers(count: number): Usuario[] {
    const nombres = ['Juan', 'María', 'Carlos', 'Ana', 'Roberto', 'Laura', 'Pedro', 'Carmen', 'José', 'Isabel'];
    const apellidos = ['Pérez', 'García', 'López', 'Martínez', 'Sánchez', 'Rodríguez', 'Fernández', 'González', 'Díaz', 'Torres'];
    const departamentos = ['Desarrollo', 'Marketing', 'Ventas', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Soporte', 'Diseño'];
    const estados: ('activo' | 'inactivo')[] = ['activo', 'inactivo'];

    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      codigo: `USR${String(i + 1).padStart(3, '0')}`,
      nombre: `${nombres[i % nombres.length]} ${apellidos[(i + 3) % apellidos.length]}`,
      email: `usuario${i + 1}@empresa.com`,
      departamento: departamentos[i % departamentos.length],
      estado: i % 5 === 0 ? estados[1] : estados[0],
      avatar: this.getInitials(`${nombres[i % nombres.length]} ${apellidos[(i + 3) % apellidos.length]}`)
    }));
  }

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }


  buscarUsuarios() {
    if (!this.searchTerm.trim()) {
      this.usuariosFiltrados = [...this.usuarios];
      return;
    }

    const termino = this.searchTerm.toLowerCase().trim();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.codigo.toLowerCase().includes(termino)
    );
  }

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

  limpiarBusqueda() {
    this.searchTerm = '';
    this.usuariosFiltrados = [...this.usuarios];
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
