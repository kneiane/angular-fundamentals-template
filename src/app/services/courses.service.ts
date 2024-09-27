import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "@app/features/courses/course-model";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http
      .get<{ result: Course[] }>(environment.backendURL + "/courses/all")
      .pipe(map((response) => response.result));
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(environment.backendURL + "/courses", course);
  }

  editCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(
      environment.backendURL + `/courses/${id}`, course
    );
  }

  getCourse(id: string): Observable<Course> {
    return this.http
      .get<{ result: Course }>(environment.backendURL + `/courses/${id}`)
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string) {
    return this.http.delete(environment.backendURL + `/courses/${id}`);
  }

  filterCourses(value: string) {
    return this.http.get(`/api/courses?filter=${value}`); // FIXME it probably shouldn't be 'value'
  }

  getAllAuthors() {
    return this.http.get(environment.backendURL + "/authors/all");
  }

  createAuthor(name: string) {
    return this.http.post(environment.backendURL + "/authors/add", name);
  }

  getAuthorById(id: string) {
    return this.http.get(environment.backendURL + `/authors/${id}`);
  }
}
