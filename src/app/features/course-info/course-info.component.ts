import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id: string = '';
  @Input() duration: number = 0;
  @Input() creationDate: Date = new Date();
  @Input() authors: string[] = [];
}