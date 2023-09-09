import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBankAccount } from '../_models/ibank-account';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class bankAccountService {

  constructor(private http: HttpClient) { }

  getAllBankAccounts(): Observable<IBankAccount[]> {
    return this.http.get<IBankAccount[]>(API_URL + "/api/bankAccounts/");
  }
  deleteBankAccount(id: any): Observable<any> {
    return this.http.delete<any>(API_URL + "/api/bankAccounts/" + id)
  }

  create(rib: any, iban: any, balance: any, isActive: any, description: any,userId:any) {
    return this.http.post<IBankAccount>(API_URL + "/api/bankAccounts/", {
      rib, iban, balance, isActive, description,userId
    })
  }
  updateBankAccount(account: any) {
    return this.http.put<IBankAccount>(API_URL + "/api/bankAccounts/"+account.id,account);
  }
}
