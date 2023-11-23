import { Component, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';

import { Board } from '../../interfaces/Board.interface';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent {
  // Creo les llistes que es mostraran en el Kanban
  boards!: Board[]; //TODO: Implementar, que les columnes agafarles aqui, i no passarles directament al html

  constructor(
    public tasksService: TasksService
    ) {
      // this.tasksService.getBoards().subscribe(boards => {
    //   this.boards = boards;
    // });
  }

  /**
   * Aquesta funcio controla event de 'drop', quan es realitzi una accio de agafar i deixar un element en una llista
   * propia de 'Angular Material'.
   * @param event El event que estem revent, inclueix tota la informacio per poder gestionar el 'Drag & Drop'
  */
 drop(event: CdkDragDrop<string[]>) {
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

  onDeleteTask(cardId: number, columnId: any) {
    this.tasksService.deleteTask(cardId, columnId);
  }

  // Llista de les llistes, d'aquesta manera sera mes facil iterarlas al HTML
}
