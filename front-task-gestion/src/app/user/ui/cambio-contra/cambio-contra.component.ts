import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from "@angular/forms";
import { ChangePasswordRequest } from '../../utils/schemas';

@Component({
  selector: 'app-cambio-contra',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    PasswordModule,
    MessageModule,
    FormsModule
],
  templateUrl: './cambio-contra.component.html',
  styleUrl: './cambio-contra.component.css'
})
export class CambioContraComponent {

  oldContra:string = '';
  newContra:string = '';
  confirmContra:string = '';

  errorMessage: string = '';
  showError: boolean = false;

  @Output() passwordChanged = new EventEmitter<ChangePasswordRequest>();

  sendPasswordChange() {
    this.showError = false;
    this.errorMessage = '';

    if (!this.oldContra ||!this.newContra || !this.confirmContra){
      this.mostrarError('Por favor, complete todos los campos.');
      return;
    }

    if (this.newContra !== this.confirmContra) {
      this.mostrarError('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    if (this.newContra.length < 8) {
      this.mostrarError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Validación 4: Complejidad (mayúsculas, minúsculas, números)
    const tieneMinuscula = /[a-z]/.test(this.newContra);
    const tieneMayuscula = /[A-Z]/.test(this.newContra);
    const tieneNumero = /[0-9]/.test(this.newContra);
    
    if (!tieneMinuscula || !tieneMayuscula || !tieneNumero) {
      this.mostrarError('La contraseña debe incluir mayúsculas, minúsculas y números');
      return;
    }
    
    // Validación 5: La nueva no puede ser igual a la actual
    if (this.oldContra === this.newContra) {
      this.mostrarError('La nueva contraseña debe ser diferente a la actual');
      return;
    }

    const changePasswordRequest: ChangePasswordRequest = {
      userId: 1,
      old_password: this.oldContra,
      new_password: this.newContra
    };

    this.passwordChanged.emit(changePasswordRequest);
  }

  limpiarCampos() {
    this.oldContra = '';
    this.newContra = '';
    this.confirmContra = '';
  }

  mostrarError(message: string) {
    this.errorMessage = message;
    this.showError = true;
  }

  cancelar(){
    this.limpiarCampos();
    this.showError = false;
    this.errorMessage = '';
  }
}
