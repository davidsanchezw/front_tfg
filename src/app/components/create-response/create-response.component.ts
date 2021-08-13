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

@Component({
  selector: 'app-create-response',
  templateUrl: './create-response.component.html',
  styleUrls: ['./create-response.component.css']
})
export class CreateResponseComponent implements OnInit {

  me: number;
  idTask: number;
  rol: number;
  task: Task = new Task();
  index: number[] = [0];
  counter: number = 0;
  scheduleTime: ScheduleTime = new ScheduleTime();
  empty: boolean = false;
  responseStatement: ResponseStatement = new ResponseStatement();
  responseAnswer: ResponseAnswer = new ResponseAnswer();
  responseAnswers: ResponseAnswer[] = [];
  team: Team = new Team();

  constructor(private responseService: ResponseService, private taskService: TaskService,
     private router: Router, private route: ActivatedRoute,
     private teamService: TeamService) { }

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
        }else this.empty = true;
      }, error => console.log(error));
    }

  onSubmit(){
    console.log(this.responseAnswers);
    this.responseStatement.lastTime = new Date();
    if (this.empty){
      if (this.task.typeIdentity == 2)
        this.createResponseTeam();
      else
        this.createResponse();
    }
    else
      this.updateResponse(); 
  }

  private createResponseTeam(){
    //Desarrollo
    if(this.task.typeTask==1){
      this.responseService.createResponseStatementTeam(this.responseStatement, this.team.id).subscribe(data => {
        console.log(data);
        this.responseStatement = data;
        this.responseService.createResponseAnswer(this.responseAnswer, this.responseStatement.id).subscribe(data => {
          console.log(data);
        }, error => console.log(error));
      }, error => console.log(error));
    }
    //Test
    else{
      this.responseService.createResponseStatementTeam(this.responseStatement, this.team.id).subscribe(data => {
        console.log(data);
        this.responseStatement = data;
        for(this.counter = 0;  this.counter < this.task.answers; this.counter++){
        this.responseService.createResponseAnswer(this.responseAnswers[this.counter], this.responseStatement.id).subscribe(data => {
          console.log(data);
        }, error => console.log(error));}
      }, error => console.log(error));
    }
  }

  private createResponse(){
    //Desarrollo
    if(this.task.typeTask==1){
      this.responseService.createResponseStatement(this.responseStatement, this.idTask, this.me).subscribe(data => {
        console.log(data);
        this.responseStatement = data;
        this.responseService.createResponseAnswer(this.responseAnswer, this.responseStatement.id).subscribe(data => {
          console.log(data);
        }, error => console.log(error));
      }, error => console.log(error));
    }
    //Test
    else{
      console.log(this.responseAnswers);
      this.responseService.createResponseStatement(this.responseStatement, this.idTask, this.me).subscribe(data => {
        console.log(data);
        this.responseStatement = data;
        for(this.counter = 0;  this.counter < this.task.answers; this.counter++){
        this.responseService.createResponseAnswer(this.responseAnswers[this.counter], this.responseStatement.id).subscribe(data => {
          console.log(data);
        }, error => console.log(error));}
      }, error => console.log(error));
    }
  }

  private updateResponse(){
    // Desarrollo
    if(this.task.typeTask==1)
    this.responseService.updateResponseStatement(this.responseStatement.id, this.responseStatement).subscribe(data => {
      console.log(data);
      this.responseService.updateResponseAnswer(this.responseAnswers[0].id, this.responseAnswers[0]).subscribe(data => {
            console.log(data);
          }, error => console.log(error));
    }, error => console.log(error));

    // Test
    else{
      this.responseService.updateResponseStatement(this.responseStatement.id, this.responseStatement).subscribe(data => {
        console.log(data);
        for(this.counter = 0;  this.counter < this.task.answers; this.counter++){
          console.log(this.counter);
          this.responseService.updateResponseAnswer(this.responseAnswers[this.counter].id, this.responseAnswers[this.counter]).subscribe(data => {
                console.log(data);
              }, error => console.log(error));
        }
      }, error => console.log(error));
    } 
  }

}
