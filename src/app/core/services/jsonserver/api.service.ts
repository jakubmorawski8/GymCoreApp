import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, map, Observable, of, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../../models/exercise';
import { ExercisesPageable } from '../../models/exercises-pageable';

const exerciseURL: string = environment.urlJsonServer + 'exercise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  @Output() exerciseTotal = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  postExercise(data: Exercise) {
    data.created_date = new Date(Date.now());
    data.modified_date = new Date(Date.now());
    return this.http.post<any>('http://localhost:3000/exercise', data);
  }

  getExercise() {
    return this.http.get<any>('http://localhost:3000/exercise');
  }

  getExercisePagin(page: number, limit: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('_page', String(page + 1));
    params = params.append('_limit', String(limit));
    return this.http.get<any>('http://localhost:3000/exercise', {
      observe: 'response',
      params,
    });
  }

  getData(
    nameFilter = '',
    sortField : string,
    sortOrder: string,
    pageNumber = 0,
    pageSize : number
  ): Observable<ExercisesPageable> {
    let params = new HttpParams();
    params = params.set('_sort', sortField);
    params = params.set('_order', sortOrder);
    params = params.set('_page', (pageNumber + 1).toString());
    params = params.set('_limit', pageSize.toString());

    if (nameFilter != '' && nameFilter != undefined) {
      params = params.set('name_like', nameFilter);
    }

    return this.http
      .get<any>(exerciseURL, {
        observe: 'response',
        params
      })
      .pipe(
        map((res) => {
          return new ExercisesPageable(
            res.body,
            Number(res.headers.get('X-Total-Count'))
          );
        })
      );
  }

  getExerciseFilter(filterValue: string) {
    let params = new HttpParams();
    params = params.append('name_like', filterValue);
    return this.http.get<any>('http://localhost:3000/exercise', {
      observe: 'response',
      params,
    });
  }
}
