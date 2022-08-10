import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from 'src/app/core/models/exercise';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';

@Component({
  selector: 'app-exercise-create-dialog',
  templateUrl: './exercise-create-dialog.component.html',
  styleUrls: ['./exercise-create-dialog.component.scss'],
})
export class ExerciseCreateDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<ExerciseCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public exerciseDialogData: Exercise
  ) {}
  exerciseForm!: FormGroup;
  caption: string = 'Create data';
  updateMode: boolean = false;

  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });

    if (
      this.exerciseDialogData != undefined &&
      this.exerciseDialogData != null
    ) {
      this.caption = 'Edit data';
      this.exerciseForm.controls['name'].setValue(this.exerciseDialogData.name);
      this.exerciseForm.controls['description'].setValue(
        this.exerciseDialogData.description
      );
      this.updateMode = true;
    }
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      let exercise: Exercise = 
      new Exercise(this.exerciseForm.get('name')?.value,
      this.exerciseForm.get('description')?.value,
      new Date(Date.now()),
      new Date(Date.now()));


      if (!this.updateMode) {
        this.api.postExercise(exercise).subscribe({
          next: (res) => {
            this.dialogRef.close('save');
          },
          error: (x) => {
            alert('Error while adding the exercise' + x);
          },
        });
      } else {
        this.api.updateExercise(exercise,exercise.id).subscribe({
          next: (res) => {
            this.dialogRef.close('save');
          },
          error: (x) => {
            alert('Error while updating the exercise' + x);
          },
        });
      }
    }
  }
}
