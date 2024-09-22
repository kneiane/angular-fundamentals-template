import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    // transform(minutes: number): string {
    //     const hours = Math.floor(minutes / 60);
    //     const remainingMinutes = minutes % 60;

    //     return remainingMinutes < 10
    //         ? `${hours}h:0${remainingMinutes}m`
    //         : `${hours}h:${remainingMinutes}m`;

    transform(duration: number): string {
        const hours = Math.floor(duration / 60).toString().padStart(2, '0');
        const minutes = (duration % 60).toString().padStart(2, '0');
        return `${hours}:${minutes} hours`;
      }
}
