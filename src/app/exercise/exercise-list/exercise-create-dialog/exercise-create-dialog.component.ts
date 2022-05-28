import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-create-dialog',
  templateUrl: './exercise-create-dialog.component.html',
  styleUrls: ['./exercise-create-dialog.component.scss']
})
export class ExerciseCreateDialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }
  exerciseForm !: FormGroup;

  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name : ['',Validators.required],
      description :['']
    })
  }

}
