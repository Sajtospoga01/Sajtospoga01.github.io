import { RouterOutlet } from '@angular/router';
import { Component, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { NeuralNetworkComponent } from "./neural-network/neural-network.component";
import { ViewContainerComponent } from "./view-container/view-container.component";
import { Project, ProjectDomain, Tools, Techniques } from './projects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaticViewContainerComponent } from "./static-view-container/static-view-container.component";



@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NeuralNetworkComponent, NgIf, ViewContainerComponent, StaticViewContainerComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Note: it's 'styleUrls' not 'styleUrl'
})
export class AppComponent implements AfterViewInit {
    isBrowser: boolean;
    title = 'portfolio';
    projects:Array<Project> = [
        new Project({
            name:"Vision transformer for hyperspectral image extraction",
            domainVector:[ProjectDomain.CV],
            toolsVector:[Tools.PyTorch, Tools.Numpy, Tools['NO-SQL'], Tools.Docker, Tools.Kubernetes],
            techniquesVector:[Techniques.Transformer],
            difficulty:9,
            description: "Hyperspectral content"
        }), 
        new Project({
            name:"Text classification using BERT",
            domainVector:[ProjectDomain.NLP],
            toolsVector:[Tools.PyTorch, Tools.Numpy, Tools.Pandas],
            techniquesVector:[Techniques.Transformer],
            difficulty:4,
            description: "Text classification"
        }),
        new Project({
            name:"CNN for image classification",
            domainVector:[ProjectDomain.CV],
            toolsVector:[Tools.Tensorflow, Tools.Numpy, Tools.Pandas],
            techniquesVector:[Techniques.CNN],
            difficulty: 2,
            description: "Image classification"
        }),
        
    ]

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
       
    }

    typeEffect() {
        const text = "Hello, welcome to my portfolio!";
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