import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_services/auth.service';
import { bankAccountService } from 'src/app/_services/bank-account.service';
import { StorageService } from 'src/app/_services/storage.service';
@Component({
  selector: 'app-admin-bank-account-dialog',
  templateUrl: './admin-bank-account-dialog.component.html',
  styleUrls: ['./admin-bank-account-dialog.component.scss']
})
export class AdminBankAccountDialogComponent implements OnInit {
  updating: boolean = false;
  isAdmin: boolean
  constructor(public dialogRef: MatDialogRef<AdminBankAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bankAccountService: bankAccountService,
    private storageService: StorageService,
    private _snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  form: any = {
    rib: null,
    iban: null,
    balance: null,
    isActive: null,
    description: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  ngOnInit(): void {
    this.isAdmin = this.storageService.isAdmin();
    if (this.data != null) {
      this.updating = true;
      console.log(this.updating+" WE'RE UPDATING NOT CREATING");
      this.form = {
        rib: this.data.account.rib,
        iban: this.data.account.iban,
        balance: this.data.account.balance,
        isActive: this.data.account.isActive,
        description: this.data.account.description,
      };
    }
  }

  onSubmit(): void {
    const { rib, iban, balance, isActive, description } = this.form;
    const userId = this.data.userId;
    if (!this.updating) {
      this.bankAccountService.create(rib, iban, balance, isActive, description, userId).subscribe({
        next: data => {
          console.log(data);
          this._snackBar.open(`Success`, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this._snackBar.open(`${this.errorMessage} `, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }else{
      const id = this.data.account.id;
      this.bankAccountService.updateBankAccount({id,rib, iban, balance, isActive, description, userId}).subscribe({
        next: data => {
          console.log(data);
          this._snackBar.open(`Success`, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this._snackBar.open(`${this.errorMessage} `, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
