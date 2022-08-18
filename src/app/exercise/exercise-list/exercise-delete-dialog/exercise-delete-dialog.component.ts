import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({
  selector: 'app-exercise-delete-dialog',
  templateUrl: './exercise-delete-dialog.component.html',
  styleUrls: ['./exercise-delete-dialog.component.scss']
})
export class ExerciseDeleteDialogComponent  {
  message: string = "Are you sure?"
  confirmButtonLabel = "Yes"
  cancelButtonLabel = "No"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ExerciseDeleteDialogComponent>){
      if(data){
        this.message = data.message || this.message;
        if(data.buttonText){
          this.confirmButtonLabel =  data.buttonText.ok || this.confirmButtonLabel;
          this.cancelButtonLabel = data.buttonText.cancel || this.cancelButtonLabel;
        }
      }
    }
  

  onConfirm(): void{
    this.dialogRef.close(true);
  }

}
