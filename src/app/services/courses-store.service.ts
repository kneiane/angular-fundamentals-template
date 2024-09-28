import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Author, Course } from '@app/features/courses/course-model';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<Course[]>([]);
    public courses$ = this.courses$$.asObservable();

    private authors$$ = new BehaviorSubject<Author[]>([]);
    public authors$ = this.courses$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll(): void {
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe(
            (courses) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            },
            () => this.isLoading$$.next(false)
        );
    }

    get allCourses() {
        return this.courses$$.value
    }

    createCourse(course: Course): Observable<Course> {
        this.isLoading$$.next(true);
        return this.coursesService.createCourse(course).pipe(
            tap(() => this.isLoading$$.next(false))
        );
    }

    getCourse(id: string): Observable<Course> {
        this.isLoading$$.next(true);
        return this.coursesService.getCourse(id).pipe(
            tap(() => this.isLoading$$.next(false))
        );
    }

    editCourse(id: string, course: Course) {
        // Add your code here
    }

    deleteCourse(id: string) {
        return this.coursesService.deleteCourse(id)
    }


    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors() {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().subscribe(
            (authors) => {
                this.authors$$.next(authors);
                this.isLoading$$.next(false);
            },
            () => this.isLoading$$.next(false)
        );
    }

    get allCourseAuthors() {
        return this.authors$$.value
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
    }
}
