import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-info-personal',
  standalone: true,
  imports: [ButtonModule, CardModule],
  templateUrl: './info-personal.component.html',
  styleUrl: './info-personal.component.css'
})
export class InfoPersonalComponent {

}
