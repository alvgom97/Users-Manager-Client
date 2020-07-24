import { Injectable } from '@angular/core';
import { User, Insurance } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_BASE_URL + '/users');
  }

  getUser(_id: string): Observable<User> {
    return this.httpClient.get<User>(this.API_BASE_URL + '/users/' + _id);
  }

  getInsurances(): Observable<Insurance[]> {
    return this.httpClient.get<Insurance[]>(this.API_BASE_URL + '/insurances');
  }

  deleteUser(_id: string): Observable<object> {
    return this.httpClient.delete<object>(this.API_BASE_URL + '/users/' + _id);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.API_BASE_URL + '/users/' + user._id, user);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_BASE_URL + '/users', user);
  }
}
