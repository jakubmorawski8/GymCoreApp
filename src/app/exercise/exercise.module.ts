import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { MaterialModule } from '../material/material.module';
import { ExerciseCreateDialogComponent } from './exercise-list/exercise-create-dialog/exercise-create-dialog.component';
import { FormsModule } from '@angular/forms';
import { ExerciseEditDialogComponent } from './exercise-list/exercise-edit-dialog/exercise-edit-dialog.component';
@NgModule({
  declarations: [ExerciseListComponent, ExerciseCreateDialogComponent, ExerciseEditDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class ExerciseModule {}
