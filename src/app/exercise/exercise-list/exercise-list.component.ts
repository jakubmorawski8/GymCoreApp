import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';
import { ExerciseCreateDialogComponent } from './exercise-create-dialog/exercise-create-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/core/models/exercise';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit, AfterViewInit, OnDestroy {

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
  inputSearchValue! : string;

  private subscriptions = new Subscription();
  searchValueChanged: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog, private api: ApiService) { }


  ngOnInit(): void {
    this.subscriptions.add(
      this.searchValueChanged.pipe(
        debounceTime(1000),
        distinctUntilChanged())
        .subscribe(input => {
          this.applyFilter(input);
        }));


    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.subscriptions.add(
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
        }));
  }

  pageChanged(event: PageEvent) {
    this.isLoading = true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  private applyFilter(inputValue: string) {
    this.inputSearchValue = inputValue;
    if(inputValue !=="")
    {
      this.subscriptions.add(
        this.api.getExerciseFilter(inputValue).subscribe(res => {
          this.isLoading = false;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.headers.get('X-Total-Count');
          this.dataSource = new MatTableDataSource<any>(res.body);
          this.dataSource.sort = this.sort;
        }));
    }
    else
    {
      this.loadData();
    }
  }
}


