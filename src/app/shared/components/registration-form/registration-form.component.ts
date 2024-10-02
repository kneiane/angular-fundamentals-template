import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailMatchRegex } from "@app/shared/directives/email.directive";
import { AuthService } from "@app/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [
        Validators.required,
        // emailMatchRegex()
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService
        .register({
          name: this.registrationForm.controls["name"].value,
          email: this.registrationForm.controls["email"].value,
          password: this.registrationForm.controls["password"].value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(["/login"]);
          },
        });
    } else {
      console.log("Form is invalid");
    }
  }

  submitForm() {
    this.onSubmit();
  }
}
