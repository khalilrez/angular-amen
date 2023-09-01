import { Component, OnInit } from '@angular/core';
import { IBankAccount } from '../_models/ibank-account';
import { IUser } from '../_models/user';
import { StorageService } from '../_services/storage.service';
import { bankAccountService } from '../_services/bank-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferService } from '../_services/transfer.service';

@Component({
  selector: 'app-transfer-cac-page',
  templateUrl: './transfer-cac-page.component.html',
  styleUrls: ['./transfer-cac-page.component.scss']
})
export class TransferCacPageComponent implements OnInit {

  bankAccounts: IBankAccount[];
  user: IUser;
  minDate: Date;
  errorMessage = '';
  isFailed = false;

  form:any ={
    from:null,
    to:null,
    devise:null,
    amount:null,
    type:"CAC",
    date:null
  }
  constructor(private transferService:TransferService,private _snackBar: MatSnackBar,private storageService:StorageService, private bankAccountService:bankAccountService) {
    this.minDate = new Date();
    this.user = this.storageService.getUser()
    this.form.date = this.minDate;
  }
  ngOnInit(): void {
    this.bankAccountService.getAllBankAccounts()
      .subscribe((res)=> {
        this.bankAccounts = res;
        console.log(this.bankAccounts);
      })
    console.log(this.user);
    console.log(this.minDate);
  }
  onSubmit():void{
    const {from,to,devise,type,date,amount} = this.form;
    this.transferService.makeTransfer(from,to,devise,type,date,amount).subscribe({
      next: res => {
        this.isFailed = false;
        this._snackBar.open(`Success`, 'Close', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: err => {
        this.isFailed = true
        this.errorMessage = err.error.message;
          this._snackBar.open(`${this.errorMessage} `, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });    
      }
    });
  }
}
