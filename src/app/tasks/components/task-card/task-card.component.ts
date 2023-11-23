import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/Board.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task!: Task;
  @Output() emitDeleteTask: EventEmitter<number> = new EventEmitter();

  onTaskDelete(id: number) {
    this.emitDeleteTask.emit(id);
  }


}
