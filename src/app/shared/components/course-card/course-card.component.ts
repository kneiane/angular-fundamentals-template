import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string = 'Angular';
  @Input() description: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                  has been the industry's standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                  nchanged.`;
  @Input() creationDate: string = "";
  @Input() duration: number = 160;
  @Input() authors: string[] = ['Vasiliy Dobkin', 'Nicolas Kim'];

  @Input() editable: boolean = true;

  @Output() clickOnShow = new EventEmitter<string>();

  handleClick() {
    this.clickOnShow.emit(this.title);
  }
}