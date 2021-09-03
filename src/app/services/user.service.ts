import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/api/users";
  constructor(private httpClient: HttpClient, private router: Router) { }

//----------- Admin --------------

  getUserList():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, user)
  }

  getUserById(id: number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`)
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserListByGroupId(id: number):Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/listByGrouId/${id}`);
  }

  //---------- User ----------

  login(user: User): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/login`, user);
  }

  setUserLogged(user: User) {
    sessionStorage.setItem("id", user.id.toString());
    sessionStorage.setItem("rol", user.typeUser.toString());  
    this.router.navigate(['/groups']);
  }  

  getUserLogged() {
    const id = sessionStorage.getItem("id");
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  logout() {
    sessionStorage.removeItem("me");
    sessionStorage.removeItem("rol");
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  //---
  getMedTask(idUser: number):Observable<number>{
    return this.httpClient.get<number>(`${this.baseURL}/medTask/${idUser}`)
  }
  getMedComments(idUser: number):Observable<number>{
    return this.httpClient.get<number>(`${this.baseURL}/medComments/${idUser}`)
  }
}
