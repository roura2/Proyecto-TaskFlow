import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddUserComponent } from "./pages/add-user/add-user.component";
import { ListUserComponent } from "./pages/list-user/list-user.component";
import { SearchUserComponent } from "./pages/search-user/search-user.component";
import { UserComponent } from "./pages/user/user.component";
import { UsersHomeComponent } from "./pages/users-home/users-home.component";

const routes: Routes = [
  {
    path: '',
    component: UsersHomeComponent,
    children: [
      {
        path: 'list-user',
        component: ListUserComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: 'edit-user/:id',
        component: AddUserComponent
      },
      {
        path: 'search-user',
        component: SearchUserComponent
      },
      {
        path: ':id',
        component: UserComponent
      },
      {
        path: '**',
        redirectTo: 'list-user'
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
