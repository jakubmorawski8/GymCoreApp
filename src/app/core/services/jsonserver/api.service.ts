import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, map, Observable, of, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../../models/exercise';

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
    sortField = 'id',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(exerciseURL, {
      params: new HttpParams()
        .set('name_like', nameFilter)
        .set('_sort', sortField)
        .set('_order', sortOrder)
        .set('_page', pageNumber.toString())
        .set('_limit', pageSize.toString()),
    });
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
