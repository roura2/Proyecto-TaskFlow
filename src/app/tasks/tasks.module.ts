import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { TaskCardComponent } from './components/task-card/task-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { AddColumnDialogComponent } from './components/add-column-dialog/add-column-dialog.component';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';



@NgModule({
  declarations: [
    TaskCardComponent,
    ConfirmDialogComponent,
    DialogComponent,
    DialogBodyComponent,
    HomePageComponent,
    TasksPageComponent,
    UsersPageComponent,
    AddColumnDialogComponent,
    AddTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TasksModule { }
