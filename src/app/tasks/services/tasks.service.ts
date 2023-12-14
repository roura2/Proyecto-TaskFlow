import { Injectable, NgIterable } from '@angular/core';

import { Column, Task } from '../interfaces/Column.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl: string = environment.baseUrl;
  private initBoard: Column[] = [];

  // Creem un observable per gestionar les llistes, nomes es cragaran en cas de que hi hagi algun
  // canvi en elles, per defecte angular renderitza tots el components cada 10ms
  // lo que fa que sogui molt inaficient, d'aquesta manera, nomes es renderitzara el component si
  // ha hagut algun canvi en algunes de les tasques
  // ? private boardsSubject: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  // ? public readonly boards$: Observable<Board[]> = this.boardsSubject.asObservable();

  private board: any[] = this.initBoard;
  private board$ = new BehaviorSubject<any[]>(this.initBoard);

  constructor(private http: HttpClient) { }

  getBoards() {
    // ? return this.boardsSubject.next(this.initBoard)
    return this.board$.asObservable();
  }

  deleteColumn(columnId: number) {
    this.board = this.board.filter((column: Column) => column.id !== columnId);
    this.board$.next([...this.board]);
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

  addCard(text: string, columnId: number) { // TODO: Implementar descripcio en la taska i usuaris
    const newTask: Task = {
      id: Date.now(),
      text,
      desc: 'Aixo es una descripcio',
      manager: {
        id: 1,
        name: 'Joan',
        lastname: "Roura",
        email: "jrouralema@gmail.com",
        address: "Carrer Roca Guillera",
        tel: 601982898
      }
    };

    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.tasks = [newTask, ...column.tasks];
      }
      return column;
    });

    this.board$.next([...this.board]);


  }

  addColumn(title: string) { // TODO: Implementar un colorPicker

    const newColumn: Column = {
      id: Date.now(),
      title,
      color: '#009886',
      tasks: []
    };

    console.log({newColumn});

    this.board = [...this.board, newColumn];
    this.board$.next([...this.board]);
    console.log(this.board, this.board$);
  }
}
