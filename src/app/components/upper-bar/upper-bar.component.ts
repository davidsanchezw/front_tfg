import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upper-bar',
  templateUrl: './upper-bar.component.html',
  styleUrls: ['./upper-bar.component.css']
})
export class UpperBarComponent implements OnInit {

  id: number;
  rol: number;
  user: User = new User();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem("id"));
    this.rol = Number(sessionStorage.getItem("rol"));
  }

  myDetails(me: number){
    this.router.navigate(['user-details', me]);
  }

  goToGroups(){
    this.router.navigate(['groups']);
  }

  logOut(){
    this.userService.logout();
    this.ngOnInit();
  }

}
