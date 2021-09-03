import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  group: Group = new Group();
  constructor(private groupService: GroupService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {    
    if (Number(sessionStorage.getItem("rol")) != 111) this.router.navigate(['/']);
  }

  saveGroup(){
    this.groupService.createGroup(this.group).subscribe( data =>{
      console.log(data);
      this.group = data;
      this.goToAddXLSX();
    },
    error => {console.log(error);
    this.toastr.error("", "Grupo existente");
  });
    

  }

  goToAddXLSX(){
    this.router.navigate(['add-xlsx', this.group.id]);
  }

  onSubmit(){
    console.log(this.group);
    this.saveGroup();
  }
}
