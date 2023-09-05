import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService,private userService:UserService,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  public toggleMfa(){
    this.currentUser.mfaEnabled = !this.currentUser.mfaEnabled;
    console.log(this.currentUser)
    this.userService.updateUser(this.currentUser).subscribe((res)=>{
      this._snackBar.open("Succès","Fermer");
    },(err)=>{
      this._snackBar.open("Erreur "+err.error.message,"Fermer");
    })
  }
}