import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from './pages/home-page/home-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'tasks',
        component: TasksPageComponent
      },
      {
        path: 'users',
        component: UsersPageComponent
      },
      {
        path: '**',
        redirectTo: 'tasks'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule { }
