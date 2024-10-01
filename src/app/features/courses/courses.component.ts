import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(protected coursesStore: CoursesStoreService, protected userStore: UserStoreService, protected router: Router) {}

  ngOnInit(): void {
    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors().subscribe();
  }

  handleShowCourse(id: string): void {
    this.router.navigate([`/courses/${id}`])
  }

  handleEditCourse(id: string): void {
    this.router.navigate([`/courses/edit/${id}`])
  }

  handleDeleteCourse(id: string) {
    this.coursesStore.deleteCourse(id).subscribe(
      () => this.coursesStore.getAll()
    );
  }

  handleAddCourseClick(){
    this.router.navigate(['/add'])
  }

  handleSearchClicked(searchText: string): void {
    if (searchText) {
      this.coursesStore.filterCourses(searchText);
    } else {
      this.coursesStore.getAll();
    }
  }
}
