import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';
import { ExerciseCreateDialogComponent } from './exercise-create-dialog/exercise-create-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/core/models/exercise';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'created_date', 'modified_date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ELEMENT_DATA: Exercise[] = [];
  isLoading = true;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog() {

    let config: MatDialogConfig = {
      panelClass: "dialog-responsive"
    }

    const dialogRef = this.dialog.open(ExerciseCreateDialogComponent,
      config);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.loadData();
      }

    });
  }


  loadData() {
    this.api.getExercisePagin(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.headers.get('X-Total-Count');
          this.dataSource = new MatTableDataSource<any>(res.body);
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }


  pageChanged(event: PageEvent) {
    this.isLoading = true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


