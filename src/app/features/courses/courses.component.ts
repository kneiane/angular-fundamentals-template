import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(protected coursesStore: CoursesStoreService, protected coursesFacade: CoursesStateFacade, protected userStore: UserStoreService, protected router: Router) {}

  ngOnInit(): void {
    this.coursesStore.getAllAuthors().subscribe();
    this.coursesFacade.getAllCourses();
  }

  handleShowCourse(id: string): void {
    this.router.navigate([`/courses/${id}`]);
    this.coursesFacade.getSingleCourse(id);
  }

  handleEditCourse(id: string): void {
    this.router.navigate([`/courses/edit/${id}`])
  }

  handleDeleteCourse(id: string) {
    this.coursesFacade.deleteCourse(id);
  }

  handleAddCourseClick(){
    this.router.navigate(['/add'])
  }

  handleSearchClicked(searchText: string): void {
    if (searchText) {
      this.coursesFacade.getFilteredCourses(searchText);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }
}
