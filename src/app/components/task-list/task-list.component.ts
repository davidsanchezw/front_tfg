import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/classes/task';
import { ScheduleTimeService } from 'src/app/services/schedule-time.service';
import { ScheduleTime } from 'src/app/classes/schedule-time';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  id: number;
  rol: number;
  group: Group = new Group();
  scheduleTime: ScheduleTime;
  tasks: Task[];
  
  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private groupService : GroupService, private router: Router,
    private scheduleTimeService : ScheduleTimeService) { }

  ngOnInit(): void {
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol == 0) this.router.navigate(['/']);
    this.getGroupById();
    this.getTasks();
  }

  private getGroupById(){    
    this.id = this.route.snapshot.params['id'];
    this.groupService.getGroupById(this.id).subscribe( data => {
      this.group = data;
    })
  }

  private getTasks(){
    this.taskService.getTaskListByGroup(this.id).subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  newTask(id: number){
    this.router.navigate(['create-task', id]);
  }

  updateTask(id: number){
    this.router.navigate(['update-task', id]);
  }

  createResponse(idTask: number){
    this.router.navigate(['create-response', idTask]);
  }

  goToCommentsList(idTask: number){
    this.router.navigate(['comment-list', idTask]);
  }
}
