import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleTime } from 'src/app/classes/schedule-time';
import { Task } from 'src/app/classes/task';
import { ScheduleTimeService } from 'src/app/services/schedule-time.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  
  me: number;
  rol: number;
  group:number;
  task: Task = new Task();
  scheduleTime: ScheduleTime = new ScheduleTime();

  numberTeam: number;
  typeTask:number;
  typeIdentity: number;

  constructor(private route: ActivatedRoute, private scheduleTimeService: ScheduleTimeService,
    private taskService: TaskService, private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol != 2) this.router.navigate(['/']);
    this.group = this.route.snapshot.params['id'];
    this.me = Number(sessionStorage.getItem("id"));
  }

  onSubmit(){
    this.task.typeTask = this.typeTask;
    this.task.typeIdentity = this.typeIdentity;
    console.log(this.task);
    console.log(this.scheduleTime);
    this.saveTask();
  }

  saveTask(){

    this.taskService.createTask(this.task, this.group).subscribe( data =>{
      //Crear tiempos 
      this.saveScheduleTime(data.id);

      //Comprobar tipo: equipo o individual
      if (this.task.typeIdentity == 2) {
        this.createTeams(data.id);
      }
      this.goToGroupTasks();
    },
    error => console.log(error));    
  }

  saveScheduleTime(idTask: number){

    this.scheduleTime.presentation = (new Date(this.scheduleTime.presentation)).toISOString();
    this.scheduleTime.revision = (new Date(this.scheduleTime.revision)).toISOString();
    this.scheduleTime.finalPresentation = (new Date(this.scheduleTime.finalPresentation)).toISOString();
    this.scheduleTime.finalRevision = (new Date(this.scheduleTime.finalRevision)).toISOString();
    console.log(this.scheduleTime);

    this.scheduleTimeService.createScheduleTime(this.scheduleTime, idTask).subscribe( data =>{
      console.log(data);      
    },
    error => console.log(error));
  }

  goToGroupTasks(){
    this.router.navigate(['tasks', this.group]);
  }

  createTeams(idTask: number){
    this.teamService.createTeam(idTask, this.numberTeam).subscribe( data =>{
      console.log(data);      
    },
    error => console.log(error));
  }

}
