import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
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

  constructor(public fb: FormBuilder, public library: FaIconLibrary, protected coursesStore: CoursesStoreService, private coursesFacade: CoursesStateFacade, private router: Router, private activatedRoute: ActivatedRoute) {
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
    this.coursesStore.getAllAuthors().subscribe();
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
              this.coursesFacade.getSingleCourse(id);
              this.coursesFacade.course$.subscribe(
                (course) => {
                  if (course) {
                    this.courseForm.controls['title'].setValue(course.title);
                    this.courseForm.controls['description'].setValue(course.description);
                    this.courseForm.controls['duration'].setValue(course.duration);
                    this.authors.clear();
                    course.authors.forEach(authorId => this.addCourseAuthor(authorId));
                  }
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

  addCourseAuthor(id: string): void {
    this.authors.push(this.fb.control(id, Validators.required));
  }

  createAuthor(name: string): void {
    this.coursesStore.createAuthor(name).subscribe(
      () => {
        this.coursesStore.getAllAuthors().subscribe();
      }
    )
  }

  isAuthorAddedToCourse(authorId: string): boolean {
    for (let author of this.authors.controls) {
      if (author.value === authorId) {
        return true;
      }
    }
    return false;
  }

  getAuthorById(id: string) {
    return this.coursesStore.getAuthorById(id);
  }

  deleteAuthor(id: string): void {
    this.coursesStore.deleteAuthor(id).subscribe(
      () => {
        this.coursesStore.getAllAuthors().subscribe();
      }
    )
  }

  handleRemoveCourseAuthorClicked(authorId: string) {
    let arr = ((this.courseForm.get('authors') as FormArray).value as Array<string>);
    this.authors.clear();
    arr.filter((e) => authorId !== e).forEach(
      e => this.addCourseAuthor(e)
    )
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.editExisting) {
        if (this.editedId) {
          this.coursesFacade.editCourse(this.editedId, this.courseForm.value);
        } else {
          throw new Error("No edited ID present - this should be a bug.");
        }
      } else {
        this.coursesFacade.createCourse(this.courseForm.value);
      }
    }
  }



}