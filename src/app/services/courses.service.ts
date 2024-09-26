import { query } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    http: any;
    getAll() {
        return this.http.get('/api/courses');
    }

    createCourse(course: any) { // replace 'any' with the required interface
        return this.http.post('/api/courses', course);
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        return this.http.put(`/api/courses/${id}`, course);
    }

    getCourse(id: string) {
        return this.http.get(`/api/courses/${id}`);
    }

    deleteCourse(id: string) {
        return this.http.delete(`/api/courses/${id}`);
    }

    filterCourses(value: string) {
        return this.http.get(`/api/courses?filter=${query}`);
    }

    getAllAuthors() {
        return this.http.get('/api/authors');
    }

    // createAuthor(name: string) {
    //     return this.http.post('/api/authors', author);
    // }

    getAuthorById(id: string) {
        return this.http.get(`/api/authors/${id}`);
    }
}
