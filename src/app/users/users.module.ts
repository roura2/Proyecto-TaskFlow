import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { UsersHomeComponent } from './pages/users-home/users-home.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { SearchUserComponent } from './pages/search-user/search-user.component';
import { UserComponent } from './pages/user/user.component';



@NgModule({
  declarations: [
    UsersHomeComponent,
    AddUserComponent,
    ListUserComponent,
    SearchUserComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class UsersModule { }
