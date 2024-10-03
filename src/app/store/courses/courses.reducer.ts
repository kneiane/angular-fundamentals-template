import { Course } from "@app/features/courses/course-model";
import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

export const coursesReducer = createReducer(
  initialState,

  // Request All
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isAllCoursesLoading: false,
  })),

  // Request Single
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Request Filtered
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Request Delete
  on(CoursesActions.requestDeleteCourse, (state, { id }) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
    ...state,
    allCourses: state.allCourses.filter((course) => course.id !== id),
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Request Edit
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Request Create
  on(CoursesActions.requestCreateCourse, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
