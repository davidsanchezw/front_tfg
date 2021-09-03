import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  i: number;
  medTask: number;
  medComments: number;

  user: User = new User();

  constructor(private route: ActivatedRoute, private userService : UserService,
    private router: Router, private toastr: ToastrService) { }

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
      this.user.hash = "";
      if (this.me != data.id && this.rol == 1) this.router.navigate(['/']);
      this.getMedTask(idUser);
    })
  }

  getMedTask(idUser: number){
    this.userService.getMedTask(idUser).subscribe( data => {
      this.medTask = data;
      this.getMedComments(idUser);
    })
  }

  getMedComments(idUser: number){
    this.userService.getMedComments(idUser).subscribe( data => {
      this.medComments = data;
    })
  }

  changePassword(){
      if (this.user.hash.length < 6 || this.needNumber(this.user.hash) ||this.needSmall(this.user.hash)||this.needBig(this.user.hash)){
        this.toastr.info("La contraseña debe tener como mínimo 6 caracteres, tener una mayúscula y un número", "Requisitos");
      } else {
        this.userService.updateUser(this.id, this.user).subscribe(data =>{
          console.log(data);
          this.user = new User();
          this.toastr.success("", "Contraseña modificada");
          this.ngOnInit();
        }, error => console.log(error));
      }
  }

  needNumber(pass: String){
    var numeros = "0123456789";
    for(this.i=0; this.i<pass.length; this.i++){
      if (numeros.indexOf(pass.charAt(this.i),0)!=-1){
         return false;
      }
   }
   return true;
  }
  needSmall(pass: String){
    var letras = "abcdefghyjklmnñopqrstuvwxyz";
    for(this.i=0; this.i<pass.length; this.i++){
      if (letras.indexOf(pass.charAt(this.i),0)!=-1){
         return false;
      }
   }
   return true;
  }
  needBig(pass: String){
    var letras_M = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
    for(this.i=0; this.i<pass.length; this.i++){
      if (letras_M.indexOf(pass.charAt(this.i),0)!=-1){
         return false;
      }
   }
   return true;
  }
}
