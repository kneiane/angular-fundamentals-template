import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  editExisting: boolean = false;
  editedId?: string;

  constructor(public fb: FormBuilder, public library: FaIconLibrary, protected coursesStore: CoursesStoreService, private router: Router, private activatedRoute: ActivatedRoute) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      newAuthor: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]],
      duration: [0, [Validators.required, Validators.min(0)]],
    });
    this.coursesStore.getAllAuthors().subscribe()
    this.editCourse();
  }

  editCourse(): void {
    this.activatedRoute.url.subscribe(
      (urlSegments) => {
        if (urlSegments[0].path === "courses" && urlSegments[1].path === "edit") {
          this.editExisting = true;
          this.activatedRoute.params.subscribe(
            (params) => {
              const id = params['id'];
              this.editedId = id;
              this.coursesStore.getCourse(id).subscribe(
                (course) => {
                  this.courseForm.controls['title'].setValue(course.title);
                  this.courseForm.controls['description'].setValue(course.description);
                  this.courseForm.controls['duration'].setValue(course.duration);
                  this.courseForm.controls['authors'].setValue(course.authors);
                }
              )
            }
          );
        }
      }
    )
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor(authorName: string): void {
    if (!this.courseForm.controls['newAuthor'].errors) {
      this.authors.push(this.fb.control(authorName, Validators.required));
    }
    
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.editExisting) {
        if (this.editedId) {
          this.coursesStore.editCourse(this.editedId, this.courseForm.value).subscribe(
            {
              next: () => this.router.navigate(['/courses'])
            }
          )
        } else {
          throw new Error("No edited ID present - this should be a bug.");
        }
      } else {
        this.coursesStore.createCourse(this.courseForm.value).subscribe(
          {
            next: () => this.router.navigate(['/courses'])
          }
        );
        console.log("Form Submitted!");
        console.log(this.courseForm.value);
      }
    } else {
      console.log("Form is invalid");
    }
  }



}