import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      authorField: new FormControl('', [Validators.minLength(2)]),
      authors: this.fb.array([]),
      newAuthor: new FormControl('', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),

    });
  
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor(authorName: string): void {
    this.authors.push(this.fb.control(authorName, Validators.required));
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

}