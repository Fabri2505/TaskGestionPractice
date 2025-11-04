import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, ButtonModule, RippleModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class NotFoundComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }

}
