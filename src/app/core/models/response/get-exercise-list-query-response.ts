import { ExerciseListVm } from "./exercise-list-vm";


export interface GetExerciseListQueryResponse { 
    success?: boolean;
    message?: string | null;
    validationErrors?: Array<string> | null;
    totalCount?: number;
    exercises?: Array<ExerciseListVm> | null;
}

export class GetExerciseListQueryResponse implements GetExerciseListQueryResponse{
    constructor(success : boolean, message: string | "", validationErrors: Array<string> | null, totalCount : number, exercises : ExerciseListVm)
    {
        success = success;
        message = message;
        validationErrors = validationErrors;
        totalCount = totalCount;
        exercises = exercises;
    }
}
