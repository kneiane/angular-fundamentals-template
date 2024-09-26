import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject } from 'rxjs';
import { Course } from '@app/features/courses/course-model';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<Course[]>([]);
    public courses$ = this.courses$$.asObservable();

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

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    getCourse(id: string) {
        // Add your code here
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    deleteCourse(id: string) {
        // Add your code here
    }

    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors() {
        // Add your code here
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
    }
}
