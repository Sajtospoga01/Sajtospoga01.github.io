export enum ProjectDomain {
    "NLP",
    "CV",
    "Data Engineering",
    "Architecture",
    "Frontend",
}

export enum Tools {
    "Python",
    "C++",
    "Kotlin",
    "Tensorflow",
    "Tensorflow Lite/LiteRT",
    
    "PyTorch",
    "Keras",
    "OpenCV",
    "Numpy",
    "Pandas",
    "Dask",
    "FastAPI",
    "NextJS",
    "Matplotlib",
    "Seaborn",
    "Scikit-learn",
    "SQL",
    "NO-SQL",
    "Docker",
    "Kubernetes",
}

export enum Techniques{ 
    "CNN",
    "RNN",
    "Transformer",
    "Database Optimization",
    "Frontend",
    "Agentic Systems",
}

export interface DisplayableItem {
    name: string;
    description: string;
    id: number;
    domainVector?: Array<number>;
    toolsVector?: Array<number>;
    techniquesVector?: Array<number>;
    difficulty?: number;
    // Add Experience-specific optional properties
    company?: string;
    role?: string;
    duration?: string;
}

interface ProjectParams {
    name: string;
    domainVector: Array<ProjectDomain>;
    toolsVector: Array<Tools>;
    techniquesVector: Array<Techniques>;
    difficulty: number;
    description?: string;  // optional parameter
}

interface ExperienceParams {
    name: string;
    company: string;
    role: string;
    duration: string;
    domainVector?: Array<ProjectDomain>;
    toolsVector?: Array<Tools>;
    techniquesVector?: Array<Techniques>;
    description?: string;
}

export class Project {
    "name": string;
    "domainVector": Array<number>;
    "toolsVector": Array<number>;
    "techniquesVector": Array<number>;
    "difficulty": number;
    "id": number = 0;
    "description": string = "";
    static id: any = 0;


    constructor(params: ProjectParams) {
        this.name = params.name;
        this.domainVector = params.domainVector;
        this.toolsVector = params.toolsVector;
        this.techniquesVector = params.techniquesVector;
        this.difficulty = params.difficulty;
        this.description = params.description || "";  // default value if not provided
        this.id = Project.id++;
    }

    getVectorOneHotVector() {
        let domainLen = Object.keys(ProjectDomain).length;
        let toolsLen = Object.keys(Tools).length ;
        let techniquesLen = Object.keys(Techniques).length;

        let vector = new Array<number>(domainLen +toolsLen + techniquesLen);
        for (let i = 0; i < domainLen; i++) {
            vector[i] = this.domainVector.includes(i) ? 1 : 0;
        }
        for (let i = 0; i < toolsLen; i++) {
            vector[i + domainLen] = this.toolsVector.includes(i) ? 1 : 0;
        }
        for (let i = 0; i < techniquesLen; i++) {
            vector[i + domainLen + toolsLen] = this.techniquesVector.includes(i) ? 1 : 0;
        }
        console.log(vector);
        return vector;
    }
}

export class Experience implements DisplayableItem {
    name: string;
    company: string;
    role: string;
    duration: string;
    domainVector?: Array<number>;
    toolsVector?: Array<number>;
    techniquesVector?: Array<number>;
    description: string = "";
    id: number = 0;
    static id: number = 0;

    constructor(params: ExperienceParams) {
        this.name = params.name;
        this.company = params.company;
        this.role = params.role;
        this.duration = params.duration;
        this.domainVector = params.domainVector;
        this.toolsVector = params.toolsVector;
        this.techniquesVector = params.techniquesVector;
        this.description = params.description || "";
        this.id = Experience.id++;
    }
}