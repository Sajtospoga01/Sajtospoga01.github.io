import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDomain, Tools, Techniques } from '../projects';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-view-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-container.component.html',
  styleUrl: './view-container.component.css',
  encapsulation: ViewEncapsulation.None,
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
    ProjectDomain = ProjectDomain;
    Tools = Tools;
    Techniques = Techniques;
    selectedItem: Project | null = null;
    showContent: boolean = false;
    constructor(private sanitizer: DomSanitizer) {}

    getEnumName(enumObj: any, index: number): string {
        return enumObj[index];
    }

    mapArrayToEnumNames(indices: number[], enumObj: any): string[] {
        return indices.map(index => this.getEnumName(enumObj, index));
    }

    getSafeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    async onSelect(item: Project) {
      this.selectedItem = item;
      this.showContent = false;
      console.log(item);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.showContent = true;
    }
}