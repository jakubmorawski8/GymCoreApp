import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExerciseCreateDialogComponent } from './exercise-create-dialog/exercise-create-dialog.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  
  openDialog() {
    
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive"
    }

    const dialogRef = this.dialog.open(ExerciseCreateDialogComponent,
      config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}


