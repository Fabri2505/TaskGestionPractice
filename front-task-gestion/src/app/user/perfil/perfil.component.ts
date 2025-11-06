import { Component, inject } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfoPersonalComponent } from '../ui/info-personal/info-personal.component';
import { CambioContraComponent } from "../ui/cambio-contra/cambio-contra.component";
import { PreferenciaComponent } from '../ui/preferencia/preferencia.component';
import { AvatarComponent } from '../ui/avatar/avatar.component';
import { ChangePasswordRequest } from '../utils/schemas';
import { PerfilService } from '../data-access/perfil.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    AvatarComponent,
    InputSwitchModule,
    Toast,
    InfoPersonalComponent,
    CambioContraComponent,
    PreferenciaComponent
  ],
  providers: [MessageService],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private perfilServ = inject(PerfilService);
  private messageService = inject(MessageService);

  passwordChanged(passwordObj: ChangePasswordRequest) {
    // Aquí puedes manejar el evento de cambio de contraseña

    this.perfilServ.changePassword(passwordObj).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.messageService.add({severity:'success', summary:'Éxito', detail:response.message});
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al cambiar la contraseña:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo cambiar la contraseña. Por favor, inténtelo de nuevo.'});
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    });
  }
}
