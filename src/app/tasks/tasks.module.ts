import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { TaskHomeComponent } from './pages/task-home/task-home.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { SearchTaskComponent } from './pages/search-task/search-task.component';
import { TaskComponent } from './pages/task/task.component';
import { ListTaskComponent } from './pages/list-task/list-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';



@NgModule({
  declarations: [
    TaskHomeComponent,
    AddTaskComponent,
    SearchTaskComponent,
    TaskComponent,
    ListTaskComponent,
    TaskCardComponent,
    ConfirmDialogComponent,
    DialogComponent,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class TasksModule { }
