import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe((user) => {
      this.name$$.next(user.name);
      this.isAdmin$$.next(user.isAdmin);
    });
  }

  getUser() {
    // Add your code here
  }

  // get isAdmin() {
  //     // Add your code here. Get isAdmin$$ value
  // }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
  }
}
