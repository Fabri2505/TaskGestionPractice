import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfoPersonalComponent } from '../ui/info-personal/info-personal.component';
import { CambioContraComponent } from "../ui/cambio-contra/cambio-contra.component";
import { PreferenciaComponent } from '../ui/preferencia/preferencia.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    AvatarModule,
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
