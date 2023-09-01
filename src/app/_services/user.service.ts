import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../_models/user';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]>{
    const URL = `${API_URL}/users`;
    return this.http.get<IUser[]>(URL,{withCredentials:true});
  }

  deleteUser(id: number) {
    return this.http.delete<any>(API_URL + "/users/" + id);
  }
}
