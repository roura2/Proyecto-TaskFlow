import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/Task.interface';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task!: Task;
  @Output() emitDeleteTask: EventEmitter<number> = new EventEmitter();
  @Output() emitEditTask: EventEmitter<{idTask: number, task: Task}> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService
  ) { }

  onTaskDelete(id: number) {
    this.emitDeleteTask.emit(id);
  }

  onTaskEdit(taskId: number, task: Task) {
    const editTaskDialog = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      data: task
    });

    editTaskDialog.afterClosed().subscribe(task => {
      if (task) {
        this.emitEditTask.emit({ idTask: task.id, task });
      }
    });
  }
}
