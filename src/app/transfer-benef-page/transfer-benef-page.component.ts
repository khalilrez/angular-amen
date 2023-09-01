import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBankAccount } from '../_models/ibank-account';
import { IUser } from '../_models/user';
import { StorageService } from '../_services/storage.service';
import { TransferService } from '../_services/transfer.service';
import { bankAccountService } from '../_services/bank-account.service';

@Component({
  selector: 'app-transfer-benef-page',
  templateUrl: './transfer-benef-page.component.html',
  styleUrls: ['./transfer-benef-page.component.scss']
})
export class TransferBenefPageComponent implements OnInit{
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
    type:"BENEF",
    date:null
  }
  constructor(private transferService:TransferService,private _snackBar: MatSnackBar,
    private storageService:StorageService, private bankAccountService:bankAccountService) {
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
    const toMockAccount:IBankAccount = {
      rib:to,
      iban:null,
      id:null,
      isActive:null,
      balance:null,
      description:null
    };
    console.log(to)
    this.transferService.makeTransfer(from,toMockAccount,devise,type,date,amount).subscribe({
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
