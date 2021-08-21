import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/classes/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = "http://localhost:8080/api/tasks";
  constructor(private httpClient: HttpClient, private router: Router) { }

  getTaskList():Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.baseURL}`);
  }

  createTask(task: Task, id: number): Observable<Task>{
    return this.httpClient.post<Task>(`${this.baseURL}/${id}`, task)
  }

  getTaskById(id: number):Observable<Task>{
    return this.httpClient.get<Task>(`${this.baseURL}/${id}`)
  }

  updateTask(id: number, task: Task): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, task);
  }

  getTaskListByGroup(id: number): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.baseURL}/TaskListByGroup/${id}`);
  }

  getTaskByComment(id: number): Observable<Task>{
    return this.httpClient.get<Task>(`${this.baseURL}/TaskByComment/${id}`);
  }
}
