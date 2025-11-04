import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-cambio-contra',
  standalone: true,
  imports: [
    ButtonModule, 
    CardModule, 
    PasswordModule,
    MessageModule
  ],
  templateUrl: './cambio-contra.component.html',
  styleUrl: './cambio-contra.component.css'
})
export class CambioContraComponent {

}
