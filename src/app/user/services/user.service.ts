import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}
    
    getUser(): Observable<{name: string, email: string, password: string, role: string}> {
        return this.http.get<{result: {name: string, email: string, password: string, role: string}}>(environment.backendURL + '/users/me').pipe(
            map(
                (response) => response.result
            )
        );
    }
}
