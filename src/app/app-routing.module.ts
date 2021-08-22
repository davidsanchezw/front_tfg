import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { AddXlsxComponent } from './components/add-xlsx/add-xlsx.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { UpdateGroupComponent } from './components/update-group/update-group.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { CreateResponseComponent } from './components/create-response/create-response.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CreateResponseFinalComponent } from './components/create-response-final/create-response-final.component';
import { CreateCommentFinalComponent } from './components/create-comment-final/create-comment-final.component';





const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'user-details/:id', component: UserDetailsComponent},
  {path: 'create-group', component: CreateGroupComponent},
  {path: 'add-xlsx/:id', component: AddXlsxComponent},
  {path: 'groups', component: GroupListComponent},
  {path: 'group-details/:id', component: GroupDetailsComponent},
  {path: 'update-group/:id', component: UpdateGroupComponent},
  {path: 'tasks/:id', component: TaskListComponent},
  {path: 'create-task/:id', component: CreateTaskComponent},
  {path: 'update-task/:id', component: UpdateTaskComponent},
  {path: 'create-response/:id', component: CreateResponseComponent},
  {path: 'create-comment/:id', component: CreateCommentComponent},
  {path: 'comment-list/:id', component: CommentListComponent},  
  {path: 'create-response-final/:id', component: CreateResponseFinalComponent},
  {path: 'create-comment-final/:id', component: CreateCommentFinalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
