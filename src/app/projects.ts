export enum ProjectDomain {
    "NLP",
    "CV",
    "Data Engineering",
}

export enum Tools {
    "Python",
    "Tensorflow",
    "PyTorch",
    "Keras",
    "OpenCV",
    "Numpy",
    "Pandas",
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
}
interface ProjectParams {
    name: string;
    domainVector: Array<ProjectDomain>;
    toolsVector: Array<Tools>;
    techniquesVector: Array<Techniques>;
    difficulty: number;
    description?: string;  // optional parameter
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