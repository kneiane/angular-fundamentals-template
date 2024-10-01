import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesListComponent } from "./courses-list.component";
import { SharedModule } from "../../../shared/shared.module";

const components = [CoursesListComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, SharedModule],
  exports: [components],
})
export class CoursesListModule {}
