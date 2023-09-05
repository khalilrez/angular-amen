import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_API = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      BASE_API + '/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName:string, lastName: string,username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      BASE_API + '/auth/signup',
      {
        firstName,lastName,
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(BASE_API + '/auth/signout', { }, httpOptions);
  }
  generateOtp(): Observable<any> {
    return this.http.get(`${BASE_API}/auth/generate`);
  }

  verifyOtp(otpCode: string): Observable<any> {
    return this.http.post(`${BASE_API}/auth/verify`, { otpCode });
  }

  checkStatus(): Observable<any>{
    return this.http.get(`${BASE_API}/auth/check-status`)
  }

  changeStatus(): Observable<any>{
    return this.http.get(`${BASE_API}/auth/complete-verification`)
  }

  sendActivationEmail():Observable<any>{
    return this.http.get(BASE_API+"/auth/send-activation/");
  }

  activateUser(activationCode:string):Observable<any>{
    return this.http.get(BASE_API+"/auth/activation/"+activationCode);
  }
  
}