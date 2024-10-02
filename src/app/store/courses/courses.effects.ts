import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from "./courses.actions";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Course } from '@app/features/courses/course-model';
import { getAllCourses } from './courses.selectors';

@Injectable()
export class CoursesEffects {
  constructor(private actions$: Actions, private coursesService: CoursesService, private router: Router, private store: Store<{ courses: Course[] }>) {}

  // 1. Effect to get all courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>  // FIXME check if exhaustMap is better
        this.coursesService.getAll().pipe(
          map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      ),
    )
  );

  // 2. Effect to get filtered courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.store.pipe(select(getAllCourses))), // FIXME invoke BE instead
      mergeMap(([action, allCourses]) => {
        const filteredCourses = allCourses.filter(course => 
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return of(CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses }));
      }),
      catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error })))
    )
  );

  // 3. Effect to get a specific course
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(action =>
        this.coursesService.getCourse(action.id).pipe(
          map(course => CoursesActions.requestSingleCourseSuccess({ course })),
          tap(() => this.router.navigate(['/courses/' + action.id])),
          catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
        )
      )
    )
  );

  // 4. Effect to delete a course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(action =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestDeleteCourseSuccess({id: action.id})),
          mergeMap(() => of(CoursesActions.requestAllCourses())), // Re-fetch all courses after deletion
          catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  // 5. Effect to edit a course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(action =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map(course => CoursesActions.requestEditCourseSuccess({ course })),
          catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    )
  );

  // 6. Effect to create a new course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(action =>
        this.coursesService.createCourse(action.course).pipe(
          map(course => CoursesActions.requestCreateCourseSuccess({ course })),
          catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
        )
      )
    )
  );

  // 7. Effect to handle navigation after certain actions
  redirectToTheCoursesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CoursesActions.requestCreateCourseSuccess,
        CoursesActions.requestEditCourseSuccess,
        CoursesActions.requestSingleCourseFail
      ),
      tap(() => this.router.navigate(['/courses']))
    ),
    { dispatch: false } // No action is dispatched in this effect; it only handles side effects like navigation
  );

}
