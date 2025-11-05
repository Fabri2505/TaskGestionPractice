import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferencia',
  standalone: true,
  imports: [
        FormsModule,
        CardModule,
        DividerModule,
        InputSwitchModule
  ],
  templateUrl: './preferencia.component.html',
  styleUrl: './preferencia.component.css'
})
export class PreferenciaComponent {

}
