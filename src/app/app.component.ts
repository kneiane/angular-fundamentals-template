import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  
  constructor (private router: Router, protected authService: AuthService, protected userStore: UserStoreService) {}

  handleLoginClick() {
    this.router.navigate(["/login"]);
  }

  handleLogoutClick() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
