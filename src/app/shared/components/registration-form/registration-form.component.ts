import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailMatchRegex } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [
        Validators.required,
        emailMatchRegex
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
    
  }
}
