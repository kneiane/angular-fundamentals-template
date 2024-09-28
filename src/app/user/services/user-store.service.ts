import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {
    this.getUser().subscribe();
  }

  getUser(): Observable<{
    name: string;
    email: string;
    password: string;
    role: string;
  }> {
    return this.userService.getUser().pipe(
      tap({
        next: (user) => {
          this.name$$.next(user.name);
          this.isAdmin$$.next(user.role === "admin");
        },
        error: () => {
          this.name$$.next("");
          this.isAdmin$$.next(false);
        },
      })
    );
  }

  get isAdmin() {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
