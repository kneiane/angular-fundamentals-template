import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return !this.userStore.isAdmin ? true : this.router.createUrlTree(['/courses']);
  }
}
