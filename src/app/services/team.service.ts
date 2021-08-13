import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../classes/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseURL = "http://localhost:8080/api/teams";
  constructor(private httpClient: HttpClient, private router: Router) { }

  createTeam(idTask: number, numberTeam: number): Observable<Team[]>{
    return this.httpClient.post<Team[]>(`${this.baseURL}/${idTask}/${numberTeam}`, null)
  }

  getTeamsByTask(id: number): Observable<Team[]>{
    return this.httpClient.get<Team[]>(`${this.baseURL}/TeamsByTask/${id}`);
  }

  getTeamByTaskAndUser(idTask: number, idUser: number): Observable<Team>{
    return this.httpClient.get<Team>(`${this.baseURL}/TeamByTaskAndUser/${idTask}/${idUser}`);
  }
}
