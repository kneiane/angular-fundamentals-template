import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject, concatAll, delay, filter, map, Observable, tap } from 'rxjs';
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
    public authors$ = this.authors$$.asObservable();

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
        this.isLoading$$.next(true);
        return this.coursesService.editCourse(id, course).pipe(
            tap(() => this.isLoading$$.next(false))
        );
    }

    deleteCourse(id: string) {
        return this.coursesService.deleteCourse(id)
    }


    filterCourses(value: string): void {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).subscribe(
            (courses) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            },
            () => this.isLoading$$.next(false)
        )
    }

    getAllAuthors(): Observable<Author[]> {
        this.isLoading$$.next(true);
        // this.coursesService.getAllAuthors().subscribe(
        //     (authors) => {
        //         this.authors$$.next(authors);
        //         this.isLoading$$.next(false);
        //     },
        //     () => this.isLoading$$.next(false)
        // );

        return this.coursesService.getAllAuthors().pipe(
            tap(
                {
                    next: (authors) => {
                        this.authors$$.next(authors);
                        this.isLoading$$.next(false);
                    },
                    error: () => this.isLoading$$.next(false)
                }
            )
        );
    }

    get allCourseAuthors() {
        return this.authors$$.value
    }

    createAuthor(name: string) {
        return this.coursesService.createAuthor(name);
    }

    deleteAuthor(id: string): Observable<Object> {
        this.isLoading$$.next(true);
        return this.coursesService.deleteAuthor(id).pipe(
            tap(
                {
                    next: () => {
                        this.isLoading$$.next(false);
                    },
                    error: () => this.isLoading$$.next(false)
                }
            )
        );
    }

    getAuthorById(id: string) {
        return this.authors$.pipe(
            // tap((v) => {console.log("1: " + JSON.stringify(v));}),
            concatAll(),
            // tap((v) => {console.log("2: " + JSON.stringify(v));}),
            filter(a => a.id === id),
            // tap((v) => {console.log("3: " + JSON.stringify(v));}),
            map(a => a.name),
            // tap((v) => {console.log("4: " + JSON.stringify(v));}),
        );
    }
  

    // getAuthorById(id: string) {
    //     this.isLoading$$.next(true);
    //     return this.coursesService.getAuthorById(id).pipe(
    //         tap(
    //             {
    //                 next: () => {
    //                     this.isLoading$$.next(false);
    //                 },
    //                 error: () => this.isLoading$$.next(false)
    //             }
    //         )
    //     );
    // }
}
