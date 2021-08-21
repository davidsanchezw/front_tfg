import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/classes/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseURL = "http://localhost:8080/api/comments";
  constructor(private httpClient: HttpClient, private router: Router) { }

  createCommentIndividual(comment: Comment, idUser: number, idTask:number){
    return this.httpClient.post(`${this.baseURL}/${idUser}/${idTask}`, comment)
  }

  createCommentTeam(comment: Comment, idTeam: number, idTask:number){
    return this.httpClient.post(`${this.baseURL}/team/${idTeam}/${idTask}`, comment)
  }

  firstCommentIndividual(idTask:number){
    return this.httpClient.get(`${this.baseURL}/first/${idTask}`)
  }

  firstCommentTeam(idTask:number){
    return this.httpClient.get(`${this.baseURL}/firstTeam/${idTask}`)
  }

  updateComment(comment: Comment, idComment: number): Observable<Comment>{
    return this.httpClient.put<Comment>(`${this.baseURL}/${idComment}`, comment)
  }

  getCommentByTaskAndUser(idTask: number, idUser:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${this.baseURL}/TaskAndUser/${idTask}/${idUser}`);
  }

  getCommentByTaskAndTeam(idTask: number, idTeam:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${this.baseURL}/TaskAndTeam/${idTask}/${idTeam}`);
  }

  getCommentById(idComment: number):Observable<Comment>{
    return this.httpClient.get<Comment>(`${this.baseURL}/${idComment}`);
  }
}
