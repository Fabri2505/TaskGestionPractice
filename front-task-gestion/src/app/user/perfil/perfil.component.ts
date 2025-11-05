import { Component } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfoPersonalComponent } from '../ui/info-personal/info-personal.component';
import { CambioContraComponent } from "../ui/cambio-contra/cambio-contra.component";
import { PreferenciaComponent } from '../ui/preferencia/preferencia.component';
import { AvatarComponent } from '../ui/avatar/avatar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    AvatarComponent,
    InputSwitchModule,
    InfoPersonalComponent,
    CambioContraComponent,
    PreferenciaComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
