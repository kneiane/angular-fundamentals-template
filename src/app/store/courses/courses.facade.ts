import { Injectable } from '@angular/core';
import { Course } from '@app/features/courses/course-model';
import { select, Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  courses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(id: string, course: Course) {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
  }

  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
