import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from 'src/app/core/models/exercise';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';

@Component({
  selector: 'app-exercise-create-dialog',
  templateUrl: './exercise-create-dialog.component.html',
  styleUrls: ['./exercise-create-dialog.component.scss']
})
export class ExerciseCreateDialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private api: ApiService, public dialogRef: MatDialogRef<ExerciseCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public createData: any) { }
  exerciseForm !: FormGroup;


  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name : ['',Validators.required],
      description :[''],
    })

  }

   onSubmit() {
    if(this.exerciseForm.valid){
      
      let exercise : Exercise = {        
        name : this.exerciseForm.get('name')?.value,
        description : this.exerciseForm.get('description')?.value,
        created_date : new Date(Date.now()),
        modified_date : new Date(Date.now())
        
      };

      this.api.postExercise(exercise)
      .subscribe({
         next:(res) => {          
           this.dialogRef.close('save');
         },
         error:(x)=>{
           alert("Error while adding the exercise" + x);
         }
      })

      
    }
  }

}
