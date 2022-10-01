import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetExerciseListQueryResponse } from '../../models/response/get-exercise-list-query-response';

const endpointURL: string = environment.url + 'Exercise';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
    providedIn: 'root',
  })

export class ExerciseService {
  constructor(private http: HttpClient) {}

  getData(
    nameFilter = '',
    sortField: string,
    sortOrder: string,
    pageNumber = 0,
    pageSize: number
  ): Observable<HttpResponse<GetExerciseListQueryResponse>> {
    let params = new HttpParams();
    params = params.set('sortField', sortField);
    params = params.set('sortDirection', sortOrder);
    params = params.set('page', (pageNumber + 1).toString());
    params = params.set('size', pageSize.toString());

    if (nameFilter != '' && nameFilter != undefined) {
      params = params.set('name_like', nameFilter);
    }

    return this.http
      .get<GetExerciseListQueryResponse>(endpointURL + "/all", {
        observe: 'response',
        params,
      });
  }
}
