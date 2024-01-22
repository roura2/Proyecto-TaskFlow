import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { ColumnsService } from '../../services/columns.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Column } from '../../interfaces/Column.interface';
import { Task } from '../../interfaces/Task.interface';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddColumnDialogComponent } from '../../components/add-column-dialog/add-column-dialog.component';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent {

  // Creo les llistes que es mostraran en el Kanban
  columns: Column[] = []; //TODO: Implementar, que les columnes agafarles aqui, i no passarles directament al html

  currentUser: any;

  constructor(
    private authService: AuthService,
    public tasksService: TasksService,
    private columnServie: ColumnsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tasksService.getColumns().subscribe(boards => {
      // console.log(boards);

      // this.boards = boards;
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onAddColumn() {
    const addColumnDialog = this.dialog.open(AddColumnDialogComponent, {
      width: '400px',
    });

    addColumnDialog.afterClosed().subscribe(column => {
      if (column) {
        this.tasksService.addColumn(column);
      }
    });
  }

  onDeleteColumn(columnId: number) {
    this.tasksService.deleteColumn(columnId);
  }

  onDeleteTask(taskId: number, columnId: any) {
    this.tasksService.deleteTask(taskId, columnId);
  }

  onAddTask(columnId: number, column: Column) { //TODO: Implemenar descripcio
    const addTaskDialog = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      // data: column
    });

    addTaskDialog.afterClosed().subscribe(task => {
      if (task) {
        this.tasksService.addTaskToColumn(columnId, task)
      }
    });
  }

  onEditColumnTitle(columnId: number, newTitle: string) {
    this.tasksService.editColumnTitle(columnId, newTitle);
  }

  onEditTaskText(taskId: number, task: Task) {
    console.log(taskId);
    console.log(task);

    this.tasksService.editTask(taskId, task);
  }

  showSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }
}
