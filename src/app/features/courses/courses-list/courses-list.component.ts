import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';
import { Course } from '../course-model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {

  constructor(protected coursesStore: CoursesStoreService){}

  @Input() courses: Course[] = [];
  @Input() editable!: Observable<boolean>;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  handleClickOnShow(id: string): void {
    this.showCourse.emit(id);
    console.log(id);
  }

  handleTrashIconClick(id: string) {
    this.coursesStore.deleteCourse(id).subscribe(
      () => this.coursesStore.getAll()
    );

  }

}
