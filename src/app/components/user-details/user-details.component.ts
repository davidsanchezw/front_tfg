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
  rol: number;
  user: User = new User();

  constructor(private route: ActivatedRoute, private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.rol = Number(sessionStorage.getItem("rol"));
    if (this.rol == 0) this.router.navigate(['/']);
    this.id = this.route.snapshot.params['id'];
    this.me = Number(sessionStorage.getItem("id"));    
    this.getUserById(this.id);
  }

  getUserById(idUser: number){
    this.userService.getUserById(idUser).subscribe( data => {
      this.user = data;
      if (this.me != data.id && this.rol == 1) this.router.navigate(['/']);
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
