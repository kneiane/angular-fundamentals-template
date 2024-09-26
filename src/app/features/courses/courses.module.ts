import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from "../../shared/shared.module";
import { CoursesListModule } from './courses-list/courses-list.module';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesListModule
  ]
})
export class CoursesModule { }
