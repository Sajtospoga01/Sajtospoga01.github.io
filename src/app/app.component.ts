import { RouterOutlet } from '@angular/router';
import { Component, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { NeuralNetworkComponent } from "./neural-network/neural-network.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NeuralNetworkComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Note: it's 'styleUrls' not 'styleUrl'
})
export class AppComponent implements AfterViewInit {
    isBrowser: boolean;
    title = 'portfolio';

    @ViewChild('typewriter', { static: false }) typewriterElement!: ElementRef; // Use ViewChild to reference DOM element

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngAfterViewInit() {
        if (this.isBrowser) {
            this.typeEffect();
        }
        this.renderer.setStyle(this.typewriterElement.nativeElement, 'font-family', 'monospace, monospace');
        this.renderer.setStyle(this.typewriterElement.nativeElement, 'font-size', '2em');
        this.renderer.setStyle(this.typewriterElement.nativeElement, 'color', '#333');
    }

    typeEffect() {
        const text = "Hello, welcome to my website!";
        let index = 0;

        // Make sure we start with an empty innerHTML to avoid repetition
        this.typewriterElement.nativeElement.innerHTML = '';

        const typing = () => {
            if (index < text.length) {
                this.typewriterElement.nativeElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typing, 50); // Adjust speed (100ms) between characters
            }
        };

        typing();
    }
}