import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlUserService = "https://fakerestapi.azurewebsites.net/api/Users/";
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.urlUserService);
  }

  getUserId(id: string): Observable<any> {
    return this.http.get(this.urlUserService + id);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlUserService, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.urlUserService + user.ID, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.urlUserService + id);
  }
}
