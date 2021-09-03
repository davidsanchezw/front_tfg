import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseAnswer } from 'src/app/classes/response-answer';
import { ResponseStatement } from 'src/app/classes/response-statement';
import { Task } from 'src/app/classes/task';
import { Team } from 'src/app/classes/team';
import { Comment } from 'src/app/classes/comment';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit {

  me: number;
  rol: number;
  idTask: number;
  task: Task = new Task();
  counter: number = 0;
  empty: boolean = false;
  completed: boolean = false;
  responses: ResponseStatement[] = [];
  responseAnswer: ResponseAnswer = new ResponseAnswer();
  responseAnswers: ResponseAnswer[] = [];
  team: Team = new Team();
  comment: Comment = new Comment();

  constructor(private responseService: ResponseService, private taskService: TaskService,
    private teamService: TeamService,  private commentService: CommentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.me = Number(sessionStorage.getItem("id"));
    this.rol = Number(sessionStorage.getItem("rol"));    
    if (this.rol == 0) this.router.navigate(['/']);
    this.idTask = this.route.snapshot.params['id'];
    console.log(this.idTask);
    this.getTaskByID();
  }

  getTaskByID(){
    this.taskService.getTaskById(this.idTask).subscribe(data => {
      this.task = data;
      //Array con indices para html CUIDADO NULLS
      for ( this.counter = 0; this.counter<this.task.answers; this.counter++){
        this.responseAnswers.push(new ResponseAnswer());
      }
      this.getResponsesByTask();
    }, error => console.log(error));
  } 

  getResponsesByTask(){
    this.responseService.getResponsesByTask(this.idTask).subscribe(data => {
      this.responses = data;      
    }, error => console.log(error));
  } 
  
}
