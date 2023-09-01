import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  updating=false;
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private _snackBar: MatSnackBar) { }
    onNoClick(): void {
      this.dialogRef.close();
    }

    form: any = {
      username: null ,
      email: null,
      firstName: null,
      lastName: null,

    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
  
  
    ngOnInit(): void {
      if(this.data != null){
        this.updating= true
        this.form = {
          username: this.data.username ,
          email: this.data.email,
          firstName: this.data.firstName,
          lastName: this.data.lastName,
        };
      }
    }
  
    onSubmit(): void {
      const { firstName,lastName,username, email } = this.form;
      let password = username;
      if(!this.updating){
      this.authService.register(firstName,lastName,username, email, password).subscribe({
        next: data => {
          console.log(data);
          this._snackBar.open(`Success`, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });    
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
