import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Task } from '../interfaces/Task.interface';
import { Column } from '../interfaces/Column.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private localStorageKeyColumns = 'columns';
  private localStorageKeyUsers = 'users';

  private initColumns: Column[] = [];
  private columns: any[] = this.initColumns;
  private columns$ = new BehaviorSubject<any[]>(this.initColumns);

  private _baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
    const storedData = localStorage.getItem(this.localStorageKeyColumns);

    if (storedData) {
      this.columns = JSON.parse(storedData);
      this.columns$.next([...this.columns]);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKeyColumns, JSON.stringify(this.columns));
  }

  getColumns() {
    return this.columns$.asObservable();
  }

  deleteColumn(columnId: number) {
    this.columns = this.columns.filter((column: Column) => column.id !== columnId);
    this.columns$.next([...this.columns]);
    this.saveToLocalStorage();
  }

  deleteTask(taskId: number, columnId: number) {
    this.columns = this.columns.map((column) => {
      if (column.id === columnId) {
        column.tasks = column.tasks.filter((task: any) => task.id !== taskId);
      }
      return column;
    });

    this.columns$.next([...this.columns]);
    this.saveToLocalStorage();
  }

  addTaskToColumn(columnId: number, task: Task) {
    task = {
      ...task,
      id: Date.now(),
    }

    this.columns = (this.columns || []).map((column: Column) => {
      if (column.id === columnId) {
        // Asegúrate de inicializar column.tasks como un array si es undefined
        column.tasks = column.tasks || [];
        column.tasks = [task, ...column.tasks];
      }
      return column;
    });

    this.columns$.next([...this.columns]);
    this.saveToLocalStorage();
  }

  addColumn(column: Column) {
    column = {
      ...column,
      id: Date.now(),
    }
    
    this.columns = [...this.columns, column];
    this.columns$.next([...this.columns]);
    this.saveToLocalStorage();
  }

  getColumnById(columnId: number): Column | undefined {
    return this.columns.find((column: Column) => column.id === columnId);
  }

  editColumnTitle(columnId: number, newTitle: string) {
    const columnToEdit = this.getColumnById(columnId);
    if (columnToEdit) {
      columnToEdit.title = newTitle;
      this.saveToLocalStorage();
      this.columns$.next([...this.columns]);
    }
  }

  getTaskById(taskId: number): Task | undefined {
    for (const column of this.columns) {
      const task = column.tasks.find((t: Task) => t.id === taskId);
      if (task) {
        return task;
      }
    }
    return undefined;
  }

  editTask(taskId: number, newTask: Task) {
    for (const column of this.columns) {
      const taskIndex = column.tasks.findIndex((t: Task) => t.id === taskId);

      if (taskIndex !== -1) {
        // Reemplazar la tarea existente con la nueva tarea
        column.tasks[taskIndex] = { ...newTask };
        this.saveToLocalStorage();
        this.columns$.next([...this.columns]);
        return;
      }
    }
    console.log(this.columns);
  }


  // // ? Obtenir totes les tasques
  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this._baseUrl}/tasks`);
  // }

  // // ? Crear una tasca
  // createTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(`${this._baseUrl}/new-task`, task);
  // }

  // // ? Obtenir una tasca
  // getTask(taskId: string): Observable<Task> {
  //   return this.http.get<Task>(`${this._baseUrl}/get-task/${taskId}`);
  // }

  // // ? Eliminar una tasca
  // deleteTask(taskId: string): Observable<Task> {
  //   return this.http.delete<Task>(`${this._baseUrl}/delete-task/${taskId}`);
  // }

  // // ? Actualitzar una tasca
  // updateTask(taskId: string, newTask: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this._baseUrl}/update-task/${taskId}`, newTask);
  // }

  // // ? Afegir una tasca a una columna
  // addTaskToColumn(idTask: string, task: Task) {
  //   return this.http.put<Task>(`${this._baseUrl}/update-column/${idTask}`, task);
  // }
}
