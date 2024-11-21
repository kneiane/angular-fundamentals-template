import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  failedLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.controls["email"].value,
          password: this.loginForm.controls["password"].value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(["/courses"]);
          },
          error: () => {
            this.failedLogin = true;
          },
        });
    } else {
      this.loginForm.onSubmit(new Event("submit"));
      console.log("Form is invalid");
    }
  }

  resetForm() {
    this.loginForm.resetForm();
    console.log("form reset");
  }
}
