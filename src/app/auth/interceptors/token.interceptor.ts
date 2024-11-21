import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private sessionStorage: SessionStorageService,
        private router: Router,
        //private authService: AuthService
      ) {}
    
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();
        let newRequest = request;
    
        if (token) {
          newRequest = request.clone({
            setHeaders: { Authorization: `${token}` },
          });
        }
    
        return next.handle(newRequest).pipe(
          catchError(error => {
            if (error.status === 401) {
              //this.authService.logout();
              this.router.navigate(['/login']);
            }
            return throwError(() => new Error("Error in getting tokens: " + error.message));
          })
        );
      }
}
