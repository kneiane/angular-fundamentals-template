import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(value: string|Date): string {
        let date;

        if (typeof value === 'string') {
            const [day, month, year] = (value as string).split("/");
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
            date = new Date(value);
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
    
        return `${day}.${month}.${year}`;
      }
}
