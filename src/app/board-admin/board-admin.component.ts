import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../_models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../_dialogs/create-user/create-user.component';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit , OnDestroy {
  private subs = new Subscription();
  displayedColumns: string[] = ['username','email','firstName','lastName','isActive','action']

  public dataSource: MatTableDataSource<IUser>

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private userService: UserService,private _snackBar: MatSnackBar,public dialog: MatDialog,private router:Router,private storageService:StorageService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.subs.add(this.userService.getAllUsers()
    .subscribe((res)=> {
      console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<IUser>(this.dataArray);
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

  public openRecord(id: number, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });    
  }

  public deleteUser(id:number){
    this.subs.add(this.userService.deleteUser(id).subscribe((res)=>{
      this.userService.getAllUsers()
      .subscribe((res)=> {
        console.log(res);
        this.dataArray = res;
        this.dataSource = new MatTableDataSource<IUser>(this.dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      })
      this._snackBar.open("User with id " +id+" was deleted succesfully",'Close')
    },
      (err:HttpErrorResponse)=>{
        this._snackBar.open("Error deleting user",'Close')
      }
    ))
  }

  public createUserDialog(user:any){
    let dialogRef = this.dialog.open(CreateUserComponent,{data:user});
  }

  public navigateToDetails(user:any){
    this.storageService.setSelectedUser(user);
    this.router.navigateByUrl("admin/user/details")
  }

}