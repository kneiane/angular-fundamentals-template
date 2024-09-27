import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';
import { Course } from '../course-model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(): void {
    this.showCourse.emit();
    console.log('ok');
  }
}
