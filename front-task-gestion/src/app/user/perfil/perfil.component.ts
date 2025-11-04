import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule  } from 'primeng/textarea';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InfoPersonalComponent } from '../ui/info-personal/info-personal.component';
import { CambioContraComponent } from "../ui/cambio-contra/cambio-contra.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    InfoPersonalComponent,
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    PasswordModule,
    AvatarModule,
    MessageModule,
    DividerModule,
    InputSwitchModule,
    CambioContraComponent
],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
