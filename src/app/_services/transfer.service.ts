import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransfer } from '../_models/itransfer';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';



const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient ) { }

  public makeTransfer(from:any,to:any,devise:any,type:any,date:any,amount:any){
    return this.http.post<ITransfer>(API_URL+"/api/transfers",{
      sourceRib:from.rib,
      destinationRib:to.rib,
      amount,
      devise,
      type,
      date
    })

  }

  public findAllBasedOnDirection(rib:any):Observable<any>{
    return this.http.get<any>(API_URL+"/api/transfers/"+rib);
  }
}
