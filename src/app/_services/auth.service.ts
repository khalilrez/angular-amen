import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_API = environment.apiUrl;

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
      BASE_API + '/api/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName:string, lastName: string,username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      BASE_API + '/api/auth/signup',
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
    return this.http.post(BASE_API + '/api/auth/signout', { }, httpOptions);
  }
  generateOtp(): Observable<any> {
    return this.http.get(`${BASE_API}/api/auth/generate`);
  }

  verifyOtp(otpCode: string): Observable<any> {
    return this.http.post(`${BASE_API}/api/auth/verify`, { otpCode });
  }

  checkStatus(): Observable<any>{
    return this.http.get(`${BASE_API}/api/auth/check-status`)
  }

  changeStatus(): Observable<any>{
    return this.http.get(`${BASE_API}/api/auth/complete-verification`)
  }

  sendActivationEmail():Observable<any>{
    return this.http.get(BASE_API+"/api/auth/send-activation/");
  }

  activateUser(activationCode:string):Observable<any>{
    return this.http.get(BASE_API+"/api/auth/activation/"+activationCode);
  }
  
}