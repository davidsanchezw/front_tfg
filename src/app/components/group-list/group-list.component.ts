import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group[];

  constructor(private groupService: GroupService,
    private router: Router) { }

  ngOnInit(): void {
    this.getGroups();
  }

  private getGroups(){
    this.groupService.getGroupList().subscribe(data => {
      this.groups = data;
    });
  }

  groupDetails(id: number){
    this.router.navigate(['group-details', id]);
  }

  updateGroup(id: number){
    this.router.navigate(['update-group', id]);
  }

  deleteGroup(id: number){
    this.groupService.deleteGroup(id).subscribe(data =>{
      console.log(data);
      this.getGroups();
    });
  }
}
