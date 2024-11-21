import { Component, EventEmitter, Input, Output } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Course } from "../course-model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  constructor(
    protected coursesStore: CoursesStoreService,
    protected router: Router
  ) {}

  @Input() courses: Course[] = [];
  @Input() editable!: Observable<boolean>;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  handleClickOnShow(id: string): void {
    this.showCourse.emit(id);
  }

  handleEditCourse(id: string) {
    this.editCourse.emit(id);
  }

  handleTrashIconClick(id: string): void {
    this.deleteCourse.emit(id);
  }
}
