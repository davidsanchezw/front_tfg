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
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  me: number;
  rol: number;
  idTask: number;
  task: Task = new Task();
  counter: number = 0;
  scheduleTime: ScheduleTime = new ScheduleTime();
  empty: boolean = false;
  completed: boolean = false;
  team: Team = new Team();
  comments: Comment[] = [];

  constructor(private responseService: ResponseService, private taskService: TaskService,
    private teamService: TeamService,  private commentService: CommentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.me = Number(sessionStorage.getItem("id"));
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol == 0) this.router.navigate(['/']);
    this.getTaskByID();
  }

  goToCreateComment(idComment:number){
    this.router.navigate(['create-comment', idComment]);
  }

  goToCreateCommentFinal(idComment:number){
    this.router.navigate(['create-comment-final', idComment]);
  }

  getTaskByID(){
    this.idTask = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.idTask).subscribe(data => {
      this.task = data;
      console.log(data);
      this.scheduleTime = data.scheduleTime;

      if (data.typeIdentity == 2) {
        this.getCommentByTaskAndTeam();
      } else{
        this.getCommentByTaskAndUser();
      }
      
    }, error => console.log(error));
  }

  getCommentByTaskAndUser(){
    this.commentService.getCommentByTaskAndUser(this.idTask, this.me).subscribe(data => {
      if (data[0] == null)
        this.createComment();
      else{
        this.comments = data;
      }
      }, error => console.log(error));
  }

  getCommentByTaskAndTeam(){

    this.teamService.getTeamByTaskAndUser(this.idTask, this.me).subscribe(data1 => {
      this.commentService.getCommentByTaskAndTeam(this.idTask, data1.id).subscribe(data2 => {
      if (data2[0] == null)
        this.createCommentTeam();
      else{
        this.comments = data2;
      }
      }, error => console.log(error));
    }, error => console.log(error));
  }

  private createCommentTeam(){      
    this.commentService.firstCommentTeam(this.task.id).subscribe(error => console.log(error));
    this.ngOnInit();
    console.log("Creacion de reviews equipo");
  }

  private createComment(){    
    this.commentService.firstCommentIndividual(this.task.id).subscribe(error => console.log(error));
    this.ngOnInit();
    console.log("Creacion de reviews individal");
  }
}
