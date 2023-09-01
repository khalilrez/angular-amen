import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBankAccount } from '../_models/ibank-account';
const API_URL = 'http://localhost:8080/api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class bankAccountService {

  constructor(private http: HttpClient) { }

  getAllBankAccounts(): Observable<IBankAccount[]> {
    return this.http.get<IBankAccount[]>(API_URL + "/bankAccounts/");
  }
  deleteBankAccount(id: any): Observable<any> {
    return this.http.delete<any>(API_URL + "/bankAccounts/" + id)
  }

  create(rib: any, iban: any, balance: any, isActive: any, description: any,userId:any) {
    return this.http.post<IBankAccount>(API_URL + "/bankAccounts/", {
      rib, iban, balance, isActive, description,userId
    })
  }
  updateBankAccount(account: any) {
    return this.http.put<IBankAccount>(API_URL + "/bankAccounts/"+account.id,account);
  }
}
