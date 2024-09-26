import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  failedLogin = false;

  constructor(private authService: AuthService, private router: Router) {}
  // ^ equivalent with:
  // private authService: AuthService;
  // constructor (authService: AuthService) {
  //   this.authService = authService;
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login({
        email: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value,
      }).subscribe(
        {
          next: () => { this.router.navigate(["/courses"]); },
          error: () => { this.failedLogin = true; }
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  submitForm() {
    //this.loginForm.ngSubmit.emit(); // this doesn't work
    this.loginForm.onSubmit(new Event("submit")); // this works
  }

  resetForm() {
    this.loginForm.resetForm();
    console.log("form reset");
  }
}
