import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../interfaces/User.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ? Obtenir tots els usuaris
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._baseUrl}/users`);
  }

  // ? Crear un usuari
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this._baseUrl}/new-user`, user);
  }

  // ? Obtenir un usuari
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/get-user/${userId}`);
  }

  // ? Eliminar usuari
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this._baseUrl}/delete-user/${userId}`);
  }

  // ? Actualitzar usuari
  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this._baseUrl}/update-user/${userId}`, user);
  }

  // ? Obtenir sugerencies per el nom del usuari
  getSuggestionsUsers(nameUser: string): Observable<User[]> {
    return this.http.get<User[]>(`${this._baseUrl}/get-suggestion-users/${nameUser}`);
  }
}
