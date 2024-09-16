import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses = mockedCoursesList;
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();
}
