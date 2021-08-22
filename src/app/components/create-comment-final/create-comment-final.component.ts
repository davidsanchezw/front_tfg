
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseAnswer } from 'src/app/classes/response-answer';
import { ResponseStatement } from 'src/app/classes/response-statement';
import { ScheduleTime } from 'src/app/classes/schedule-time';
import { Task } from 'src/app/classes/task';
import { Team } from 'src/app/classes/team';
import { Comment } from 'src/app/classes/comment';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-comment-final',
  templateUrl: './create-comment-final.component.html',
  styleUrls: ['./create-comment-final.component.css']
})
export class CreateCommentFinalComponent implements OnInit {

  me: number;
  rol: number;
  idComment: number;
  task: Task = new Task();
  counter: number = 0;
  empty: boolean = false;
  completed: boolean = false;
  responseStatement: ResponseStatement = new ResponseStatement();
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
    this.getCommentByID();
  }

  getCommentByID(){
    this.idComment = this.route.snapshot.params['id'];
    this.commentService.getCommentById(this.idComment).subscribe(data => {
      this.comment = data;
      if (data.time != null) this.completed = true;
        console.log(data);       
      this.getTaskByComment();
    }, error => console.log(error));
  }
  
  getTaskByComment(){
    this.taskService.getTaskByComment(this.idComment).subscribe(data => {
      this.task = data;
      //Array con indices para html CUIDADO NULLS
      for ( this.counter = 0; this.counter<this.task.answers; this.counter++){
        this.responseAnswers.push(new ResponseAnswer());
      }
      this.getResponseByComment();
    }, error => console.log(error));
  } 

  getResponseByComment(){
    this.responseService.getResponseByComment(this.idComment).subscribe(data => {
      this.responseStatement = data;
      this.responseAnswers = data.responseAnswer;
      this.responseAnswer = data.responseAnswer[0]; // caso desarrollo
    }, error => console.log(error));
  } 


  onSubmit(){    
    this.updateComment(); 
  }

  private updateComment(){ 
    
    this.commentService.updateComment(this.comment, this.comment.id).subscribe(data => {
      console.log(data);
      console.log(this.completed);   
    
      if (!this.completed){
        if (this.task.typeIdentity == 1) this.getCommentByTaskAndUser();
          else this.getCommentByTaskAndTeam();
    }
      
    }, error => console.log(error));     
  } 

  getCommentByTaskAndUser(){
    this.commentService.getCommentByTaskAndUser(this.task.id, this.me).subscribe(data => {
      if (data.length < this.task.reviews)
      this.createCommentIndividual()
      
      }, error => console.log(error));
  }

  getCommentByTaskAndTeam(){

    this.teamService.getTeamByTaskAndUser(this.task.id, this.me).subscribe(data1 => {
      this.commentService.getCommentByTaskAndTeam(this.task.id, data1.id).subscribe(data2 => {
        if (data2.length < this.task.reviews)
          this.createCommentTeam()
      }, error => console.log(error));
    }, error => console.log(error));
  } 

  createCommentIndividual(){
          console.log("createCommentIndividual");

    this.commentService.createCommentIndividual(new Comment(), this.me, this.task.id).subscribe(data => {
      console.log(data);

    }, error => console.log(error));
  }

  createCommentTeam(){
      console.log("createCommentTeam");

    this.commentService.createCommentTeam(new Comment(), this.team.id, this.task.id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }

}
