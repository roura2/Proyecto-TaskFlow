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

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._baseUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    // Guardar el usuario localmente antes de hacer la solicitud al servidor
    this.saveUserLocally(user);
    return this.http.post<User>(`${this._baseUrl}/new-user`, user);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/get-user/${userId}`);
  }

  deleteUser(userId: string): Observable<User> {
    // Eliminar el usuario localmente antes de hacer la solicitud al servidor
    this.deleteUserLocally(userId);
    return this.http.delete<User>(`${this._baseUrl}/delete-user/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    // Actualizar el usuario localmente antes de hacer la solicitud al servidor
    this.updateUserLocally(userId, user);
    return this.http.put<User>(`${this._baseUrl}/update-user/${userId}`, user);
  }

  getSuggestionsUsers(nameUser: string): Observable<User[]> {
    return this.http.get<User[]>(`${this._baseUrl}/get-suggestion-users/${nameUser}`);
  }

  // Funciones para manejar almacenamiento local

  private saveUserLocally(user: User): void {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private deleteUserLocally(userId: string): void {
    console.log('Deleting user locally:', userId);
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const updatedUsers = users.filter((u: { id: string }) => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  private updateUserLocally(userId: string, updatedUser: User): void {
    console.log('Updating user locally:', userId, updatedUser);
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const updatedUsers = users.map((u: User) => (u.id === userId ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
}
