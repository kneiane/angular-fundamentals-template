import { Pipe, PipeTransform } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";

@Pipe({
  name: 'authorNameById'
})
export class AuthorNameByIdPipe implements PipeTransform {

  constructor (private courseStore: CoursesStoreService) {}

  transform(authorId: string) {
    return this.courseStore.getAuthorById(authorId);
  }

}
