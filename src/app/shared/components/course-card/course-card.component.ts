import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string;
  @Input() duration!: number;
  @Input() authors!: string[];

  @Input() editable!: boolean;

  @Output() clickOnShow = new EventEmitter<string>();

  handleClick() {
    this.clickOnShow.emit(this.title);
    console.log('ok');
  }
}