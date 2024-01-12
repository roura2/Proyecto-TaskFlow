import { Injectable } from '@angular/core';
import { Column, Task } from '../interfaces/Column.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/tasks/interfaces/User.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private localStorageKey = 'myTasksData';
  private initBoard: Column[] = [];
  private board: any[] = this.initBoard;
  private board$ = new BehaviorSubject<any[]>(this.initBoard);

  private _baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      this.board = JSON.parse(storedData);
      this.board$.next([...this.board]);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.board));
  }

  getBoards() {
    return this.board$.asObservable();
  }

  deleteColumn(columnId: number) {
    this.board = this.board.filter((column: Column) => column.id !== columnId);
    this.board$.next([...this.board]);
    this.saveToLocalStorage();
  }

  deleteTask(taskId: number, columnId: number) {
    this.board = this.board.map((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.filter((task: any) => task.id !== taskId);
      }
      return column;
    });

    this.board$.next([...this.board]);
    this.saveToLocalStorage();
  }

  addCard(text: string, columnId: number) {
    const newTask: Task = {
      id: Date.now(),
      text,
      desc: 'Aixo es una descripcio',
      manager: {
        id: "1",
        name: 'Joan',
        lastname: 'Roura',
        email: 'jrouralema@gmail.com',
        address: 'Carrer Roca Guillera',
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
    this.saveToLocalStorage();
  }

  addColumn(title: string) {
    const newColumn: Column = {
      id: Date.now(),
      title,
      color: '#009886',
      tasks: []
    };

    this.board = [...this.board, newColumn];
    this.board$.next([...this.board]);
    this.saveToLocalStorage();
  }

  // Método para buscar una columna por su ID
  getColumnById(columnId: number): Column | undefined {
    return this.board.find((column: Column) => column.id === columnId);
  }

  // Método para editar el título de una columna por su ID
  editColumnTitle(columnId: number, newTitle: string) {
    const columnToEdit = this.getColumnById(columnId);
    if (columnToEdit) {
      columnToEdit.title = newTitle;
      this.saveToLocalStorage();
      this.board$.next([...this.board]);
    }
  }

  // Método para buscar una tarea por su ID
  getTaskById(taskId: number): Task | undefined {
    for (const column of this.board) {
      const task = column.tasks.find((t: Task) => t.id === taskId);
      if (task) {
        return task;
      }
    }
    return undefined;
  }

  // Método para editar el texto de una tarea por su ID
  editTaskText(taskId: number, newText: string) {
    for (const column of this.board) {
      const task = column.tasks.find((t: Task) => t.id === taskId);
      if (task) {
        task.text = newText;
        this.saveToLocalStorage();
        this.board$.next([...this.board]);
        return;
      }
    }
  }

}
