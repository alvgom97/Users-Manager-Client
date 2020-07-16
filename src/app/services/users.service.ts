import { Injectable } from '@angular/core';
import { User } from "src/app/models/user.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_BASE_URL = "http://localhost:3000";
  private users: User[];

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_BASE_URL + '/users/');
  };

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_BASE_URL + '/users/' + id);
  }
}
