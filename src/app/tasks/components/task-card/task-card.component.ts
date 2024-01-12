import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/Column.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task!: Task;
  // @Output() emitEditTaskText: EventEmitter<> = new EventEmitter();
  @Output() emitDeleteTask: EventEmitter<number> = new EventEmitter();
  @Output() emitEditTaskText: EventEmitter<{ taskId: number, newText: string }> = new EventEmitter();

  onTaskDelete(id: number) {
    this.emitDeleteTask.emit(id);
  }

  onTaskEdit(id: number, newText: string) {
    if (newText) {
      this.emitEditTaskText.emit({ taskId: id, newText: newText });
    }
  }
}
