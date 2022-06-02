import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
