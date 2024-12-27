import { Component, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { NeuralNetworkComponent } from "./neural-network/neural-network.component";
import { ViewContainerComponent } from "./view-container/view-container.component";
import { Project, ProjectDomain, Tools, Techniques } from './projects';
import { StaticViewContainerComponent } from "./static-view-container/static-view-container.component";
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NeuralNetworkComponent, NgIf, ViewContainerComponent, StaticViewContainerComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], // Note: it's 'styleUrls' not 'styleUrl'
    animations: [
        trigger('fadeAnimation', [
            transition(':leave', [
                animate('1000ms', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    isBrowser: boolean;
    title = 'portfolio';
    headerVisible = true;
    contentVisible = true;
    headerOpacity = 1;
    headerScale = 1;
    headerPosition = 0;
    projects: Array<Project> = [
        new Project({
            name:"DataLake, an open-source analytics platform",
            domainVector:[ProjectDomain.Architecture, ProjectDomain['Data Engineering']],
            toolsVector:[Tools.Pandas, Tools.Dask, Tools.FastAPI, Tools.NextJS, Tools['NO-SQL'], Tools.Docker, Tools.Kubernetes],
            techniquesVector:[Techniques['Database Optimization']],
            difficulty:9,
            description: "DataLake is an <strong>open-source</strong> web platform I developed to transform how teams work with data. The platform offers a <strong>multi-tenant</strong> environment where different organizations can <strong>securely</strong> manage their data sources through a <strong>single dashboard</strong>. Users can <strong>create queries</strong> and visualizations <strong>without</strong> writing <strong>code</strong>, making data analysis accessible to team members regardless of their technical background. The platform supports <strong>real-time collaboration</strong>, allowing teams to work together on analyses and share insights. Built with <strong>scalability</strong> in mind, DataLake handles growing data needs while maintaining performance. It's a solution that bridges the gap between complex data operations and everyday business users through an intuitive, no-code interface."
        }), 
        new Project({
            name:"Vision transformer for hyperspectral image extraction",
            domainVector:[ProjectDomain.CV],
            toolsVector:[Tools.PyTorch, Tools.Numpy, Tools['NO-SQL'], Tools.Docker, Tools.Kubernetes],
            techniquesVector:[Techniques.Transformer, Techniques.CNN],
            difficulty:9,
            description: "VIT-HSI is my <strong>research</strong> project exploring advanced modifications to <strong>Vision Transformers</strong> for specialized image processing tasks, started out as standard <strong>CNN semantic segmentation</strong> project. Building on DINOv2's self-supervised <strong>contrastive learning</strong> approach, I adapted the architecture to handle <strong>hyperspectral imagery</strong> - extending beyond traditional RGB processing to analyze multiple spectral bands. The implementation features a dual encoder architecture that processes both spatial and spectral information independently, allowing for more nuanced feature extraction from complex hyperspectral data. Through detailed Jupyter notebooks, I document the model's architecture, training process, and experimental results, demonstrating how these modifications enhance performance in specialized imaging applications."
        }), 
        new Project({
            name:"Text classification using BERT",
            domainVector:[ProjectDomain.NLP],
            toolsVector:[Tools.PyTorch, Tools.Numpy, Tools.Pandas],
            techniquesVector:[Techniques.Transformer],
            difficulty:3,
            description: "Twitter NLP is my project that helps understand how people communicate on social media. By analyzing Twitter conversations using artificial intelligence, the project reveals patterns in how people express themselves, what topics they discuss, and how they feel about different subjects. I've documented the entire process through interactive notebooks that show both the analysis and results, making it easy for others to understand how we can learn from social media conversations using AI tools."
        }),
        new Project({
            name:"Food Swipe, when you don't know where to eat.",
            domainVector:[ProjectDomain.Frontend],
            toolsVector:[Tools.NextJS],
            techniquesVector:[Techniques.Frontend],
            difficulty:1,
            description: ""
        }),


    ]

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            fromEvent(window, 'scroll').subscribe(() => {
                const scrollPosition = window.scrollY;
                const percent = scrollPosition / window.innerHeight;
                
                // Smoother transitions for both scroll up and down
                this.headerOpacity = Math.max(0.3, 1 - percent);
                this.headerScale = Math.max(0.5, 1 - percent);
                this.headerPosition = -scrollPosition / (1- percent * 0.5);
                this.contentVisible = scrollPosition > 0;
            });
        }
    }

    typeEffect() {

    }
}