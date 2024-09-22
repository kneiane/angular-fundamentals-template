import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  onSubmit() {
    console.log('this.loginForm.submitted: ' + this.loginForm.submitted);
    if (this.loginForm.valid) {
      console.log("Form Submitted!");
      console.log(this.loginForm.value);
      this.resetForm();
    } else {
      console.log("Form is invalid");
    }
  }

  submitForm() {
    //this.loginForm.ngSubmit.emit(); // this doesn't work
    this.loginForm.onSubmit(new Event('submit')); // this works
  }

  resetForm() {
    this.loginForm.resetForm();
    console.log("form reset");
  }
}
