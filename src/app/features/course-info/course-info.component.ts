import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  constructor(
    protected coursesStore: CoursesStoreService,
    private activatedRoute: ActivatedRoute,
    protected router: Router,
    private coursesFacade: CoursesStateFacade
  ) {}

  @Input() title!: string;
  @Input() description!: string;
  @Input() id!: string;
  @Input() duration!: number;
  @Input() creationDate!: Date;
  @Input() authors!: string[];

  ngOnInit(): void {
    this.coursesFacade.course$.subscribe(
      (course) => {
        if (course) {
          this.title = course.title;
          this.description = course.description;
          this.id = course.id;
          this.duration = course.duration;
          this.creationDate = this.stringToDate(course.creationDate);
          this.authors = course.authors;
        }
      }
    )
    this.coursesStore.getAllAuthors().subscribe();
    this.activatedRoute.params.subscribe((params) => {
      this.coursesFacade.course$.subscribe(
        (course) => {
          if (!course) {
            const idInUrl = params['id'];
            if (idInUrl) {
              this.coursesFacade.getSingleCourse(idInUrl);
            }
          }
        }
      )
    });
  }

  handleBackButton() {
    this.router.navigate(["/courses"]);
  }

  stringToDate(source: string): Date {
    const [day, month, year] = source.split("/");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

}
