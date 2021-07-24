import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  group: Group = new Group();
  constructor(private groupService: GroupService, private router: Router) { }

  ngOnInit(): void {
  }

  saveGroup(){
    //Falta añadir caso si existe nombre
    this.groupService.createGroup(this.group).subscribe( data =>{
      console.log(data);
      this.group = data;
      this.goToAddXLSX();
    },
    error => console.log(error));
  }

  goToAddXLSX(){
    this.router.navigate(['add-xlsx', this.group.id]);
  }

  onSubmit(){
    console.log(this.group);
    this.saveGroup();
  }
}
