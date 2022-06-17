import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Exercise } from '../../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postExercise(data : Exercise){   
    data.created_date = new Date(Date.now());
    data.modified_date = new Date(Date.now());
    return this.http.post<any>("http://localhost:3000/exercise",data);    
  }

  getExercise(){
    return this.http.get<any>("http://localhost:3000/exercise");
  }

  getExercisePagin(page: number, limit: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('_page', String(page + 1));
    params = params.append('_limit', String(limit));
    return this.http.get<any>('http://localhost:3000/exercise',{observe: 'response',params});
  }

  getExerciseFilter(filterValue : string){
    let params = new HttpParams();
    params = params.append('name_like',filterValue);
    return this.http.get<any>('http://localhost:3000/exercise',{observe: 'response',params});
  }
}
