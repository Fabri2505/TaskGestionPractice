import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

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
    TableModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    TagModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  searchTerm: string = '';

  ngOnInit() {
    // Datos de ejemplo
    this.usuarios = [
      {
        id: 1,
        codigo: 'USR001',
        nombre: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        departamento: 'Desarrollo',
        estado: 'activo'
      },
      {
        id: 2,
        codigo: 'USR002',
        nombre: 'María García',
        email: 'maria.garcia@empresa.com',
        departamento: 'Marketing',
        estado: 'activo'
      },
      {
        id: 3,
        codigo: 'USR003',
        nombre: 'Carlos López',
        email: 'carlos.lopez@empresa.com',
        departamento: 'Ventas',
        estado: 'inactivo'
      },
      {
        id: 4,
        codigo: 'USR004',
        nombre: 'Ana Martínez',
        email: 'ana.martinez@empresa.com',
        departamento: 'Recursos Humanos',
        estado: 'activo'
      },
      {
        id: 5,
        codigo: 'USR005',
        nombre: 'Roberto Sánchez',
        email: 'roberto.sanchez@empresa.com',
        departamento: 'Desarrollo',
        estado: 'activo'
      }
    ];
    this.usuariosFiltrados = [...this.usuarios];
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

  adjuntarTarea(usuario: Usuario) {
    console.log('Adjuntar tarea a:', usuario);
    // Aquí implementarías la lógica para adjuntar una tarea
  }

  compartirTarea(usuario: Usuario) {
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
}
