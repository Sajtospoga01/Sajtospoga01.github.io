import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-static-view-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-view-container.component.html',
  styleUrl: './static-view-container.component.css',
  animations: [
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StaticViewContainerComponent {
    @Input() isSplit: boolean = false;
    @Input() splitRatio: number = 30;
}
