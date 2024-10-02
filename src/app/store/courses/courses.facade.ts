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
  // Public Observables to expose state values from the store
  isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  courses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  /*** Dispatches an action to request all courses from the store   */
  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  /*** Dispatches an action to request a single course by ID   * @param id - The ID of the course to retrieve   */
  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  /*** Dispatches an action to request filtered courses based on a search value (e.g., course title)
   * @param searchValue - The search string to filter courses by title   */
  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  /*** Dispatches an action to edit an existing course by its ID and updated course data
   * @param id - The ID of the course to edit
   * @param course - The updated course data   */
  editCourse(id: string, course: Course) {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
  }

  /*** Dispatches an action to create a new course   * @param course - The new course data to be created   */
  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  /*** Dispatches an action to delete a course by its ID   * @param id - The ID of the course to delete   */
  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
