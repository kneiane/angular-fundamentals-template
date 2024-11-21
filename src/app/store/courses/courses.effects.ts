import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CoursesActions from "./courses.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Course } from "@app/features/courses/course-model";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
    private store: Store<{ courses: Course[] }>
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      mergeMap((action) =>
        this.coursesService.filterCourses(action.title).pipe(
          map((courses) =>
            CoursesActions.requestFilteredCoursesSuccess({ courses: courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestFilteredCoursesFail({ error }))
          )
        )
      ),
      catchError((error) =>
        of(CoursesActions.requestFilteredCoursesFail({ error }))
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((course) =>
            CoursesActions.requestSingleCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() =>
            CoursesActions.requestDeleteCourseSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((course) => CoursesActions.requestEditCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) =>
            CoursesActions.requestCreateCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );
}
