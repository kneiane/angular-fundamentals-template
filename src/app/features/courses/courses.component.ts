import { Component } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(protected coursesStore: CoursesStoreService, protected userStore: UserStoreService) {}

  ngOnInit(): void {
    this.coursesStore.getAll();
  }
}
