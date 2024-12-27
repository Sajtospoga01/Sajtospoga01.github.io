import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, ProjectDomain, Tools, Techniques, DisplayableItem, Experience } from '../projects';
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
    @Input() items: DisplayableItem[] = [];
    ProjectDomain = ProjectDomain;
    Tools = Tools;
    Techniques = Techniques;
    selectedItem: DisplayableItem | null = null;
    showContent: boolean = false;
    constructor(private sanitizer: DomSanitizer) {}

    getEnumName(enumObj: any, index: number): string {
        return enumObj[index];
    }

    mapArrayToEnumNames(indices: number[] | undefined, enumObj: any): string[] {
        return indices ? indices.map(index => this.getEnumName(enumObj, index)) : [];
    }

    getSafeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    async onSelect(item: DisplayableItem) {
      this.selectedItem = item;
      this.showContent = false;
      console.log(item);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.showContent = true;
    }

    isExperience(item: DisplayableItem): item is Experience {
        return item instanceof Experience;
    }

    isProject(item: DisplayableItem): item is Project {
        return item instanceof Project;
    }
}