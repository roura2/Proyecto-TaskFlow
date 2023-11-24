  import { Injectable, NgIterable } from '@angular/core';

import { Board } from '../interfaces/Board.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private initBoard: Board[] = [
    {
      id: 1,
      title: 'To Do',
      color: '#e92c62',
      tasks: [
        {
          id: 1,
          text: 'Example card item',
          desc: 'This is a description of teh item',
          manager: {
            id: 1,
            name: "Joan"
          }
        },
        {
          id: 2,
          text: 'Example card item',
          desc: 'This is a description of teh item',
          manager: {
            id: 1,
            name: "Joan"
          }
        }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      color: 'green',
      tasks: [
        {
          id: 2,
          text: 'Example card item',
          desc: 'This is a description of teh item',
          manager: {
            id: 2,
            name: "Samir"
          }
        }
      ]
    },
    {
      id: 3,
      title: 'Done',
      color: 'blue',
      tasks: [
        {
          id: 1,
          text: 'Example card item',
          desc: 'This is a description of teh item',
          manager: {
            id: 2,
            name: "Samir"
          }
        }
      ]
    },
  ]

  // Creem un observable per gestionar les llistes, nomes es cragaran en cas de que hi hagi algun
  // canvi en elles, per defecte angular renderitza tots el components cada 10ms
  // lo que fa que sogui molt inaficient, d'aquesta manera, nomes es renderitzara el component si
  // ha hagut algun canvi en algunes de les tasques
  // ? private boardsSubject: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  // ? public readonly boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  private board: any[] = this.initBoard;
  private board$ = new BehaviorSubject<any[]>(this.initBoard)
  constructor() { }

  getBoards() {
    // ? return this.boardsSubject.next(this.initBoard)
    return this.board$.asObservable();
  }

  deleteTask(taskId: number, columnId: number) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.filter((task: any) => task.id !== taskId);
      }
      return column;
    });

    this.board$.next([...this.board]);
  }
}
