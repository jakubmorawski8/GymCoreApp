import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { MaterialModule } from '../material/material.module';
import { ExerciseCreateDialogComponent } from './exercise-list/exercise-create-dialog/exercise-create-dialog.component';
import { FormsModule } from '@angular/forms';
import { ExerciseEditDialogComponent } from './exercise-list/exercise-edit-dialog/exercise-edit-dialog.component';
import { ExerciseDeleteDialogComponent } from './exercise-list/exercise-delete-dialog/exercise-delete-dialog.component';
@NgModule({
  declarations: [ExerciseListComponent, ExerciseCreateDialogComponent, ExerciseEditDialogComponent, ExerciseDeleteDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class ExerciseModule {}
