import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleTime } from '../classes/schedule-time';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScheduleTimeService {

  private baseURL = "http://localhost:8080/api/times";
  constructor(private httpClient: HttpClient) { }

  createScheduleTime(scheduleTime: ScheduleTime, id: number): Observable<ScheduleTime>{
    return this.httpClient.post<ScheduleTime>(`${this.baseURL}/${id}`, scheduleTime)
  }

  updateScheduleTime(scheduleTime: ScheduleTime, id: number): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, scheduleTime);
  }
}
