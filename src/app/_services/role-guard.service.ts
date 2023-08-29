import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.storageService.isAdmin()) {
      return this.router.parseUrl('/notauthorized');
    } else {
      return true;
    }
  }
}
