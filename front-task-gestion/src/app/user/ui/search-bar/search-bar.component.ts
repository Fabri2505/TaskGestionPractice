import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    IconFieldModule, 
    InputIconModule, 
    InputTextModule,
    ButtonModule,
    FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() cantUser:number = 0;
  searchTerm: string = '';
  @Output() searchTermEmit = new EventEmitter<string>();

  emitirTermino(){

    const termino = this.searchTerm.toLowerCase().trim();

    this.searchTermEmit.emit(termino);
  }

  limpiarBusqueda() {
    this.searchTerm = '';
    this.cantUser = 0;
  }
}
