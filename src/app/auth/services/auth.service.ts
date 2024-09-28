import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthorized$ = this.isAuthorized$$.asObservable();
  
    constructor(private http: HttpClient, private sessionStorage: SessionStorageService, private userStorageService: UserStoreService) {       
    }

    login(user: {email: string, password: string}): Observable<any> {
        return this.http.post(environment.backendURL + "/login", user).pipe(
            map((response: any) => {
              this.sessionStorage.setToken(response.result);
              this.isAuthorized$$.next(true);
              this.userStorageService.getUser().subscribe();
            })
          );
    }

    logout() {
        const clearValues = () => {
            this.sessionStorage.deleteToken();
            this.isAuthorised = false;
            this.userStorageService.getUser().subscribe();
        };

        return this.http.delete(environment.backendURL + "/logout").subscribe(
            {
                next: clearValues, 
                error: clearValues
            }
        );
    }

    register(user: {name: string, email: string, password: string}) {
        
        // FIXME invoke router to take you to the login page, with a pipe/subscribe method. see getLoginUrl()
        return this.http.post(environment.backendURL + "/register", user).pipe(
            map((response: any) => {
            //   this.sessionStorage.setToken(response.result);
            //   this.isAuthorized$$.next(true);
            })
        );
    }

    get isAuthorised() {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return "/login";
    }

    hasToken(): boolean {
        return !!this.sessionStorage.getToken();
      }

}
