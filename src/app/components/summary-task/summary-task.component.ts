import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseAnswer } from 'src/app/classes/response-answer';
import { ResponseStatement } from 'src/app/classes/response-statement';
import { ScheduleTime } from 'src/app/classes/schedule-time';
import { Task } from 'src/app/classes/task';
import { Team } from 'src/app/classes/team';
import { ResponseService } from 'src/app/services/response.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { Comment } from 'src/app/classes/comment';
import { CommentService } from 'src/app/services/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-summary-task',
  templateUrl: './summary-task.component.html',
  styleUrls: ['./summary-task.component.css']
})
export class SummaryTaskComponent implements OnInit {

  me: number;
  idTask: number;
  rol: number;
  task: Task = new Task();
  counter: number = 0;
  scheduleTime: ScheduleTime = new ScheduleTime();
  empty: boolean = false;
  responseStatement: ResponseStatement = new ResponseStatement();
  responseAnswer: ResponseAnswer = new ResponseAnswer();
  responseAnswers: ResponseAnswer[] = [];
  team: Team = new Team();
  comments: Comment[] = [];
  sum: number;
  medTask: number;
  medComments: number;
  myComments: Comment[] = [];

  constructor(private responseService: ResponseService, private taskService: TaskService,
     private router: Router, private route: ActivatedRoute,
     private teamService: TeamService, private commentService: CommentService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.me = Number(sessionStorage.getItem("id"));
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol == 0) this.router.navigate(['/']);
    this.getTaskByID();
  }

  private getTaskByID(){
    this.idTask = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.idTask).subscribe(data => {
      this.task = data;
      console.log(data);
      this.scheduleTime = data.scheduleTime;

      //Array con indices para html CUIDADO NULLS
      for ( this.counter = 0; this.counter<this.task.answers; this.counter++){
        this.responseAnswers.push(new ResponseAnswer());        
      }

      if (data.typeIdentity == 2) {
        this.getTeam();
      } else{
        this.getIndividualResponse();
      }
      
    }, error => console.log(error));
  }

  getTeam(){
    this.teamService.getTeamByTaskAndUser(this.idTask, this.me).subscribe(data => {
      this.team = data;
      console.log(data);
      this.getTeamResponse();
    }, error => console.log(error));
  }

  getIndividualResponse(){    
      this.responseService.getResponseByTaskAndUser(this.idTask, this.me).subscribe(data => {
        
        if (data !=null) {
        console.log(data.responseAnswer);
        this.responseStatement = data; 
        this.responseAnswers = data.responseAnswer;
        this.responseAnswer = data.responseAnswer[0]; // caso desarrollo
        this.getCommentsByResponse();

        }else this.empty = true;
      }, error => console.log(error));   
  }

  getTeamResponse(){   
      this.responseService.getResponseByTeam(this.team.id).subscribe(data => {
        if (data !=null) {
          console.log(data);
          this.responseStatement = data; 
          this.responseAnswers = data.responseAnswer;
          this.responseAnswer = data.responseAnswer[0]; // caso desarrollo    
          this.getCommentsByResponse();
  
        }else this.empty = true;
      }, error => console.log(error));
    }  

  getCommentsByResponse(){
    this.commentService.getCommentByResponseStatement(this.responseStatement.id).subscribe(data => {
      console.log(data);
      this.comments = data;
      this.getMedTask();
      this.getMedComments();
    }, error => console.log(error));
  }

  getMedTask(){    
    this.sum = 0;
    for(this.counter = 0; this.counter < this.comments.length; this.counter++){
      this.sum = this.sum + this.comments[this.counter].calificationResponse;
    }

    this.medTask = this.sum / this.comments.length;
  }

  getMedComments(){
    
      this.commentService.getCommentByTaskAndUser(this.idTask, this.me).subscribe(data => {
        this.myComments = data;
        this.sum = 0;
        for(this.counter = 0; this.counter < this.myComments.length; this.counter++){
          this.sum = this.sum + this.myComments[this.counter].calificationCommentator;
        }
        this.medComments = this.sum / this.myComments.length;
      }, error => console.log(error));
    
  }

  updateComment(comment: Comment, idComment: number){
    this.commentService.updateComment(comment, idComment).subscribe(data => {
      console.log(data);
      this.toastr.success("", "Puntuación guardada");   
      
    }, error => console.log(error)); 
  }
}
