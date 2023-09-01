import { Component, ViewChild } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { IUser } from '../_models/user';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IBankAccount } from '../_models/ibank-account';
import { bankAccountService } from '../_services/bank-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminBankAccountDialogComponent } from '../_dialogs/admin-bank-account-dialog/admin-bank-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.scss']
})
export class AdminUserInfoComponent {
  user:IUser
  private subs = new Subscription();
displayedColumns: string[] = ['rib','iban','balance','description','isActive','action']
private dataArray: any;

public dataSource: MatTableDataSource<IBankAccount>
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;


constructor(private bankAccountService: bankAccountService,private router:Router,private storageService:StorageService,private _snackBar:MatSnackBar,private dialog:MatDialog ,private location: Location){
 this.user = JSON.parse(localStorage.getItem("selectedUser"));
}




public deleteBankAccount(id:any){
  this.subs.add(this.bankAccountService.deleteBankAccount(id).subscribe((res)=>{
      let accountArray:IBankAccount[] = this.dataArray;
      let targetIndex = accountArray.findIndex(account => account.id == id);
      accountArray.splice(targetIndex,1)

      this.dataArray = accountArray;
      this.dataSource = new MatTableDataSource<IBankAccount>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._snackBar.open("Account with id " +id+" was deleted succesfully",'Close')
  },
    (err:HttpErrorResponse)=>{
      this._snackBar.open("Error deleting user",'Close')
    }
  ))}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem("selectedUser"));
  console.log(this.user.bankAccounts);
    this.dataArray = this.user.bankAccounts;
    this.dataSource = new MatTableDataSource<IBankAccount>(this.dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

public createAccountDialog(account:any){
  let dialogRef = this.dialog.open(AdminBankAccountDialogComponent,{data:{account,userId:this.user.id}});
  dialogRef.afterClosed().subscribe(()=>{
    this.location.back();
  })
}

}
