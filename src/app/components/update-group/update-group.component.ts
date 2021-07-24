import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/classes/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {

  id: number;
  group: Group = new Group();
  constructor(private groupService: GroupService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.groupService.getGroupById(this.id).subscribe(data => {
      console.log(data);
      this.group = data;
    }, error => console.log(error));
  }

  updateGroup(){
    this.groupService.updateGroup(this.id, this.group).subscribe(data =>{
      console.log(data);
      this.group = new Group();
      this.goToGroupList();
    }, error => console.log(error));
  }

  goToGroupList(){
    this.router.navigate(['/groups']);
  }
  
  onSubmit(){
    this.updateGroup();
  }
}
