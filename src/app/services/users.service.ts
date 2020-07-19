import { Injectable } from '@angular/core';
import { User, Issurance } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_BASE_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient, private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_BASE_URL + '/users/');
  };

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(this.API_BASE_URL + '/users/' + id);
  }

  getIssurances(): Observable<Issurance[]> {
    return this.httpClient.get<Issurance[]>(this.API_BASE_URL + '/issurances/');
  };

  deleteUser(id: string): Observable<object> {
    return this.httpClient.delete<object>(this.API_BASE_URL + '/users/' + id);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.API_BASE_URL + '/users/' + user.id, user);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_BASE_URL + '/users/', user);
  }
}
