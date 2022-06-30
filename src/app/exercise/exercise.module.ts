import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { MaterialModule } from '../material/material.module';
import { ExerciseCreateDialogComponent } from './exercise-list/exercise-create-dialog/exercise-create-dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ExerciseListComponent, ExerciseCreateDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class ExerciseModule {}
