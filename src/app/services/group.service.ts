import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../classes/group';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseURL = "http://localhost:8080/api/groups";
  constructor(private httpClient: HttpClient) { }

  getGroupList():Observable<Group[]>{
    return this.httpClient.get<Group[]>(`${this.baseURL}`);
  }

  createGroup(group: Group): Observable<Group>{
    return this.httpClient.post<Group>(`${this.baseURL}`, group)
  }

  addXLSX(id: number, ws: FormData): Observable<Object>{
    
    return this.httpClient.post(`${this.baseURL}/add/${id}`, ws)
  }

  getGroupById(id: number):Observable<Group>{
    return this.httpClient.get<Group>(`${this.baseURL}/${id}`)
  }

  updateGroup(id: number, user: Group): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  deleteGroup(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  

}
