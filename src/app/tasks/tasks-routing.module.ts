import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ListTaskComponent } from './pages/list-task/list-task.component';
import { SearchTaskComponent } from './pages/search-task/search-task.component';
import { TaskHomeComponent } from './pages/task-home/task-home.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskHomeComponent,
    children: [
      {
        path: 'list-task',
        component: ListTaskComponent
      },
      {
        path: 'add-task',
        component: AddTaskComponent
      },
      {
        path: 'edit-task/:id',
        component: AddTaskComponent
      },
      {
        path: 'search-task',
        component: SearchTaskComponent
      },
      {
        path: ':id',
        component: TaskComponent
      },
      {
        path: '**',
        redirectTo: 'list-task'
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
export class TasksRoutingModule { }
