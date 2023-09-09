import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,private storageService: StorageService,private userService:UserService,private _snackBar:MatSnackBar) { }


  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userForm = this.formBuilder.group({
      firstName: [this.currentUser.firstName],
      lastName: [this.currentUser.lastName],
      email: [this.currentUser.email],
      phone: [this.currentUser.phone],
      address: [this.currentUser.address]
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: passwordMatchValidator });

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

  onSubmit() {
    const updatedUserData = this.userForm.value;

    updatedUserData.id = this.currentUser.id;

    this.currentUser.address = updatedUserData.address;
    this.currentUser.phone = updatedUserData.phone;
    this.currentUser.firstName = updatedUserData.firstName;
    this.currentUser.lastName = updatedUserData.lastName;
    this.currentUser.email = updatedUserData.email;


    


    this.userService.updateUser(updatedUserData).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
      this.storageService.saveUser(this.currentUser)
      this._snackBar.open("Succès","Fermer");
    });

  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      const userData = this.currentUser;
      const password = this.passwordForm.get('newPassword').value;
      userData.password = password;
      this.userService.updateUser(userData).subscribe(updatedUser => {
        console.log('Password updated successfully:', updatedUser);
        this._snackBar.open("Succès","Fermer");
      });
    }
  }
  
}

// Custom validator function to check if newPassword and confirmPassword match
const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const newPassword = control.get('newPassword').value;
  const confirmPassword = control.get('confirmPassword').value;

  return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
};