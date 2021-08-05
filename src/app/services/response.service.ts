import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseAnswer } from '../classes/response-answer';
import { ResponseStatement } from '../classes/response-statement';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private baseURL = "http://localhost:8080/api/response";
  constructor(private httpClient: HttpClient, private router: Router) { }

  createResponseStatement(responseStatement: ResponseStatement, idTask: number, idUser:number): Observable<ResponseStatement>{
    return this.httpClient.post<ResponseStatement>(`${this.baseURL}/statements/${idTask}/${idUser}`, responseStatement)
  }

  updateResponseStatement(id: number, responseStatement: ResponseStatement): Observable<ResponseStatement>{
    return this.httpClient.put<ResponseStatement>(`${this.baseURL}/statements/${id}`, responseStatement);
  }

  createResponseAnswer(responseAnswer: ResponseAnswer, idStatement: number): Observable<ResponseAnswer>{
    return this.httpClient.post<ResponseAnswer>(`${this.baseURL}/answers/${idStatement}`, responseAnswer)
  }

  updateResponseAnswer(id: number, responseAnswer: ResponseAnswer): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/answers/${id}`, responseAnswer);
  }

  getResponseByTaskAndUser(idTask: number, idUser:number):Observable<ResponseStatement>{
    return this.httpClient.get<ResponseStatement>(`${this.baseURL}/${idTask}/${idUser}`);
  }
}
