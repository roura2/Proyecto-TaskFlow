import { User } from 'src/app/tasks/interfaces/User.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Task, TaskDB } from './../../interfaces/Task.interface';
import { Column } from '../../interfaces/Column.interface';

import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {

  private localStorageKeyUsers = 'users';

  task: Task = {
    id: Date.now(),
    text: '',
    desc: '',
    manager: {}
  }

  users!: User[];

  constructor(
    private dialogRef: MatDialogRef<AddColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getAllUsers();

    if (this.data) {
      const selectedUser = this.users.find(user => user.id === this.data.manager.id);

      this.task = {
        ...this.data,
        manager: selectedUser
      };
    }
  }

  getAllUsers() {
    const usersStoredData = localStorage.getItem(this.localStorageKeyUsers);

    if (usersStoredData) {
      this.users = JSON.parse(usersStoredData);
    }
  }

  confirmAddColumn() {
    this.dialogRef.close(this.task);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
