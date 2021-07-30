import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  user: User = new User();
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (Number(sessionStorage.getItem("rol")) > 0) this.router.navigate(['/groups']);
  }

  login(){
    console.log(this.user.email);
    console.log(this.user.hash);
    this.userService.login(this.user).subscribe( data => {
      console.log(data);
      this.userService.setUserLogged(data);
    },
    error => {
      console.log(error);
    });
  }

}
