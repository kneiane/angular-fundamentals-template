import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  constructor(
    protected coursesStore: CoursesStoreService,
    private activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() id: string = "";
  @Input() duration: number = 0;
  @Input() creationDate: Date = new Date();
  @Input() authors: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.coursesStore.getCourse(params["id"]).subscribe((course) => {
        this.id = course.id;
        this.title = course.title;
        this.description = course.description;
        this.duration = course.duration;
        // this.creationDate = course.creationDate;
        this.authors = course.authors;
      });
    });
  }

  handleBackButton(){
    this. router.navigate(['/courses'])
  }

}
