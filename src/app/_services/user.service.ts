import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../_models/user';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]>{
    const URL = `${API_URL}/api/users`;
    return this.http.get<IUser[]>(URL,{withCredentials:true});
  }

  deleteUser(id: number) {
    return this.http.delete<any>(API_URL + "/api/users/" + id);
  }

  updateUser(user:any): Observable<IUser>{
    return this.http.put<IUser>(API_URL + "/api/users/"+user.id,user);
  }
}
