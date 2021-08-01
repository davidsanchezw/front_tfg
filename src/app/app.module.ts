import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoginComponent } from './components/login/login.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { AddXlsxComponent } from './components/add-xlsx/add-xlsx.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { UpdateGroupComponent } from './components/update-group/update-group.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { UpperBarComponent } from './components/upper-bar/upper-bar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserDetailsComponent,
    LoginComponent,
    CreateGroupComponent,
    AddXlsxComponent,
    GroupListComponent,
    UpdateGroupComponent,
    GroupDetailsComponent,
    UpperBarComponent,
    TaskListComponent,
    CreateTaskComponent,
    UpdateTaskComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
