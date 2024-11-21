import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'consoleLog'
})
export class ConsoleLogPipe implements PipeTransform {

  transform(val: any, tag?: string) {
    if (tag) {
      console.log(tag + ":");
    }
    console.log(val);
  }
}
