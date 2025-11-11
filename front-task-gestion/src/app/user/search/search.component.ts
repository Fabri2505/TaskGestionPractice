import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { Usuario } from '../utils/schemas';
import { SearchService } from '../data-access/search.service';
import { VscrollCardSearchComponent } from '../ui/vscroll-card-search/vscroll-card-search.component';
import { SearchBarComponent } from "../ui/search-bar/search-bar.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonModule,
    VscrollCardSearchComponent,
    SearchBarComponent
],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  usuarios: Usuario[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  private serchServ = inject(SearchService);

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }


  buscarUsuarios(termino:string) {
    if (!termino) {
      this.usuarios = [];
      return;
    }

    this.loading = true;
    this.serchServ.searchUsers(termino, 'nombre').subscribe({
      next: (resultados) => {

        this.usuarios = resultados.map(usuario => {
          return {
            ...usuario,
            codigo:`USR${String(usuario.id).padStart(3, '0')}`,
            avatar: this.getInitials(usuario.nombre)
          } as Usuario;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al buscar usuarios:', error);
        this.loading = false;
      }
    });
  }

}
