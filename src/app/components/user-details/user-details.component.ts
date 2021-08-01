import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  me: number;
  user: User;

  constructor(private route: ActivatedRoute, private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
    if (Number(sessionStorage.getItem("rol")) == 0) this.router.navigate(['/']);
    this.id = this.route.snapshot.params['id'];
    this.me = Number(sessionStorage.getItem("rol"));
    this.userService.getUserById(this.id).subscribe( data => {
      this.user = data;
    })
  }

  changePassword(){
      this.userService.updateUser(this.id, this.user).subscribe(data =>{
        console.log(data);
        this.user = new User();
        this.ngOnInit();
      }, error => console.log(error));
    
  }

}
