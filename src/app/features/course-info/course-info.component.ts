import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() title: string = 'Angular';
  @Input() description: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                  has been the industry's standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                  nchanged.`;
  @Input() id: string = "de5aaa59-90f5-4dbc-b8a9-aaf205c551ba";
  @Input() duration: number = 1;
  @Input() creationDate: Date = new Date(10/11/2020);
  @Input() authors: string[] = ['Vasiliy Dobkin', 'Nicolas Kim'];
  
}
