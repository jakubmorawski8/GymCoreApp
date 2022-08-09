export interface Exercise {
    created_date : Date,
    modified_date : Date,
    name : string,
    description : string
}

export class Exercise implements Exercise{
    constructor(name : string, description : string){
        this.name = name;
        this.description = description;
    }
}