export interface Exercise {
    created_date : Date,
    modified_date : Date,
    name : string,
    description : string,
    id : number;
}

export class Exercise implements Exercise{
    constructor(name : string, description : string, createDate : Date, modifiedDate : Date){
        this.name = name;
        this.description = description;
        this.created_date = createDate;
        this.modified_date = modifiedDate;
    }
}