import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDomain, Tools, Techniques } from '../projects';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-view-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-container.component.html',
  styleUrl: './view-container.component.css',
  animations: [
    
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ViewContainerComponent {
    @Input() isSplit: boolean = false;
    @Input() splitRatio: number = 30;
    @Input() items: Project[] = [];
    
    selectedItem: Project | null = null;
    showContent: boolean = false;
  
    async onSelect(item: Project) {
      this.selectedItem = item;
      this.showContent = false;
      console.log(item);
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.showContent = true;
    }
}