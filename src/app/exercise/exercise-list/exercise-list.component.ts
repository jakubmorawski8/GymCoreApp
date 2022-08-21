import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/jsonserver/api.service';
import { ExerciseCreateDialogComponent } from './exercise-create-dialog/exercise-create-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/core/models/exercise';
import { Subject, Subscription, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  tap,
} from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../core/dialogs/confirm-dialog/confirm-dialog.component';
import { CreateDialogForm } from 'src/app/core/models/create-dialog-form';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'description',
    'created_date',
    'modified_date',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ELEMENT_DATA: Exercise[] = [];
  isLoading = true;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  defaultSortField = 'name';
  defaultSortDirection = 'asc';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  inputSearchValue!: string;

  exercises: Exercise[] = [];

  private subscriptions = new Subscription();
  searchValueChanged: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchValueChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((input) => {
          this.applyFilter(input);
        })
    );

    this.loadRows();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openDialog(data?: Exercise) {
    let config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
      data: data,
    };

    const dialogRef = this.dialog.open(ExerciseCreateDialogComponent, config);

    dialogRef.afterClosed().subscribe({
      next: (r) => {
        let result = r as CreateDialogForm<Exercise>;
        if (result.save) {
          if (data === undefined) {
            this.api.postExercise(result.data).subscribe({
              next: (postResult) => {
                if(postResult.ok)
                {
                  this.loadRows();
                }     
              },
              error: (error) =>{
                console.log("An error occurred while creating the record",error.message);
              },
            });
          } else {
            if (data.id) {
              this.api.updateExercise(result.data, data.id).subscribe({
                next: (updateResult) => {
                  if(updateResult.ok)
                  {
                    this.loadRows();
                  }
                  else{
                    console.log("Record was not updated");        
                  }                  
                },
                error: (error) =>{
                  console.log("An error occurred while updating the record",error.message);
                }
              });
            }
          }
        }
      },
    });
  }

  delete(data: Exercise) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure to delte task -  "${data.name}"`,
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
        record: data,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (data.id) {
          this.api.deleteExercise(data.id).subscribe({
            next: (res) => {
              this.loadRows();
            },
            error: (x) => {
              alert('Error while deleting the exercise' + x);
            },
          });
        }
      }
    });
  }

  loadRows() {
    this.isLoading = false;
    this.api
      .getData(
        this.inputSearchValue,
        this.sort?.active ?? this.defaultSortField,
        this.sort?.direction ?? this.defaultSortDirection,
        this.currentPage ?? 0,
        this.paginator?.pageSize ?? 5
      )
      .pipe(
        tap((exercises) => {
          this.dataSource.data = exercises.items;
          this.paginator.length = exercises.totalCount;
          this.dataSource.sort = this.sort;
        }),
        catchError((err) => {
          console.log('Error loading exercises', err);
          return throwError(() => new Error(err));
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  pageChanged(event: PageEvent) {
    this.isLoading = true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadRows();
  }

  private applyFilter(inputValue: string) {
    this.inputSearchValue = inputValue;
    this.currentPage = 0;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.loadRows();
  }

  sortChange(sortState: Sort) {
    this.currentPage = 0;
    this.loadRows();
  }
}
