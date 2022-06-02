import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';
import { ExerciseCreateDialogComponent } from './exercise-create-dialog/exercise-create-dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
displayedColumns: string[] = ['name', 'description','created_date','modified_date'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api : ApiService) { }
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

  getAllExercises(){
    this.api.getExercise()
    .subscribe({
      next : (res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : () =>{
        alert("Error while fetching the records");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  ngOnInit(): void {
    this.getAllExercises();
  }

}


