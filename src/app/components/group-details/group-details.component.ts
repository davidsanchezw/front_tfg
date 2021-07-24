import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { User } from 'src/app/classes/user';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  id: number;
  group: Group;
  users: User[];
  constructor(private route: ActivatedRoute, private router: Router,
    private groupService : GroupService, private userService : UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.groupService.getGroupById(this.id).subscribe( data => {
      this.group = data;
    });
    this.getUsers();
  }

  // getUsersByGroupId getUserListByGroupId(this.id)
  private getUsers(){
    this.userService.getUserListByGroupId(this.id).subscribe(data => {
      this.users = data;
    });
  }

  userDetails(id: number){
    this.router.navigate(['user-details', id]);
  }
}
