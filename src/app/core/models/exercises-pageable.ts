import { Meta } from "@angular/platform-browser";
import { Exercise } from "./exercise";

export interface ExercisesPageable{
    items: Exercise[];
    totalCount: number
}

export class ExercisesPageable implements ExercisesPageable{
    constructor(items: Exercise[], totalCount: number){
        this.items = items;
        this.totalCount = totalCount;
    }
}