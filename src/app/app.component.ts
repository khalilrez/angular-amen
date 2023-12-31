import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  isAdmin = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  currentUrl: string;
  isUserActive = true;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  title = "AmenNet"
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    }

    this.isAdmin = this.storageService.isAdmin();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isUserActive = this.storageService.isUserActive();


    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }
  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }



  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.sidenav.toggle();
        this.opened = false;
        this.router.navigate(["/login"])
      },
      error: err => {
        console.log(err);
      }
    });
  }

  sendActivationEmail() {
    this.authService.sendActivationEmail().subscribe((res) => {
    }
    )
    this._snackBar.open("email envoyé", "Fermer");
  }

}