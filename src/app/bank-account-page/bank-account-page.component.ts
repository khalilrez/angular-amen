import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IBankAccount } from '../_models/ibank-account';
import { Subscription } from 'rxjs';
import { bankAccountService } from '../_services/bank-account.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IUser } from '../_models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminBankAccountDialogComponent } from '../_dialogs/admin-bank-account-dialog/admin-bank-account-dialog.component';

@Component({
  selector: 'app-bank-account-page',
  templateUrl: './bank-account-page.component.html',
  styleUrls: ['./bank-account-page.component.scss']
})
export class BankAccountPageComponent {
  user: IUser;
  private subs = new Subscription();
  displayedColumns: string[] = ['rib', 'iban', 'balance', 'description', 'isActive', 'action']
  dataArray: any;

  public dataSource: MatTableDataSource<IBankAccount>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private bankAccountService: bankAccountService, private router: Router, private storageService: StorageService, private _snackBar: MatSnackBar,
     private dialog: MatDialog) {}

     ngOnInit(): void {
      this.user = this.storageService.getUser();
      this.subs.add(this.bankAccountService.getAllBankAccounts()
      .subscribe((res)=> {
        console.log(res);
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<IBankAccount>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }));
    }
    ngOnDestroy() {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public createAccountDialog(account:any){
    console.log(account)
    let dialogRef = this.dialog.open(AdminBankAccountDialogComponent,{data:{account,userId:this.user.id}});
    dialogRef.afterClosed().subscribe(()=>{
      window.location.reload();
    })
  }

  public disableAccount(account:any){
    account.isActive = !account.isActive;
    this.bankAccountService.updateBankAccount(account).subscribe((res)=>{
      console.log(res)
    });
  }
  
}