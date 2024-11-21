import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    
    transform(duration: number): string {
        const hours = Math.floor(duration / 60).toString().padStart(2, '0');
        const minutes = (duration % 60).toString().padStart(2, '0');
        return `${hours}:${minutes} hours`;
      }
}
