import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleTime } from 'src/app/classes/schedule-time';
import { Task } from 'src/app/classes/task';
import { GroupService } from 'src/app/services/group.service';
import { ScheduleTimeService } from 'src/app/services/schedule-time.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  id: number;
  rol: number;
  group: number;
  task: Task = new Task();
  scheduleTime: ScheduleTime = new ScheduleTime;
  constructor(private taskService: TaskService, private router: Router,
    private route: ActivatedRoute, private groupService: GroupService,
    private scheduleTimeService: ScheduleTimeService) { }

  ngOnInit(): void {
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol != 2) this.router.navigate(['/']);
    this.id = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.id).subscribe(data => {
      console.log(data);
      this.asignDataTask(data);
      this.scheduleTime = data.scheduleTime;
      this.conversionDate1();
    }, error => console.log(error));
  }

  asignDataTask(data :Task){
    this.task.id = data.id;
    this.task.answers = data.answers;
    this.task.reviews = data.reviews;
    this.task.statement = data.statement;
    this.task.title = data.title;
    this.task.typeIdentity = data.typeIdentity;
    this.task.typeTask = data.typeTask;
  }

  conversionDate1(){
    this.scheduleTime.presentation = (new Date(this.scheduleTime.presentation)).toISOString().substring(0, 10);
    this.scheduleTime.revision = (new Date(this.scheduleTime.revision)).toISOString().substring(0, 10);
    this.scheduleTime.finalPresentation = (new Date(this.scheduleTime.finalPresentation)).toISOString().substring(0, 10);
    this.scheduleTime.finalRevision = (new Date(this.scheduleTime.finalRevision)).toISOString().substring(0, 10);
  }

  conversionDate2(){
    this.scheduleTime.presentation = (new Date(this.scheduleTime.presentation)).toISOString();
    this.scheduleTime.revision = (new Date(this.scheduleTime.revision)).toISOString();
    this.scheduleTime.finalPresentation = (new Date(this.scheduleTime.finalPresentation)).toISOString();
    this.scheduleTime.finalRevision = (new Date(this.scheduleTime.finalRevision)).toISOString();
  }

  updateTask(){
    console.log(this.task);
    this.taskService.updateTask(this.id, this.task).subscribe(data =>{
      console.log(data);
      this.task = new Task();

      this.updateTimes(this.scheduleTime.id);


      this.goToTaskList();
    }, error => console.log(error));
  }

  updateTimes(idTimes: number){
    this.conversionDate2();
    this.scheduleTimeService.updateScheduleTime(this.scheduleTime, idTimes).subscribe( data =>{
      console.log(data);      
    },
    error => console.log(error));
  }

  goToTaskList(){
    console.log("numero 1 " + this.id);
    this.groupService.getGroupByTask(this.id).subscribe(data =>{
      this.group = data.id;
      console.log("numero 2 " + this.group); 
      this.router.navigate(['tasks', this.group]);
    }, error => console.log(error));    
  }
  
  onSubmit(){
    this.updateTask();
  }
}
