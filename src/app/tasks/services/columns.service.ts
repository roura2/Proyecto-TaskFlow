import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Column } from '../interfaces/Column.interface';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  private _baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ? Obtenir totes les columnes
  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this._baseUrl}/columns`);
  }

  // ? Crear columna
  createColumn(column: Column): Observable<Column> {
    return this.http.post<Column>(`${this._baseUrl}/new-column`, column);
  }

  // ? Obtenir una columna
  getColumn(columnId: string): Observable<Column> {
    return this.http.get<Column>(`${this._baseUrl}/get-column/${columnId}`);
  }

  // ? Eliminar columna
  deleteColumn(columnId: string): Observable<Column> {
    return this.http.delete<Column>(`${this._baseUrl}/delete-column/${columnId}`);
  }

  // ? Actualitzar columna
  updateColumn(columnId: string, column: Column): Observable<Column> {
    return this.http.put<Column>(`${this._baseUrl}/update-column/${columnId}`, column);
  }
}
