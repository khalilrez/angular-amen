import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransfer } from '../_models/itransfer';



const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient ) { }

  public makeTransfer(from:any,to:any,devise:any,type:any,date:any,amount:any){
    return this.http.post<ITransfer>(API_URL+"/transfers",{
      sourceRib:from.rib,
      destinationRib:to.rib,
      amount,
      devise,
      type,
      date
    })

  }
}
