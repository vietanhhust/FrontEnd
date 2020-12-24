import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return value;
        let num = value.replace(/'/ig, '').replace(/,/ig, '');
        let retNumber = Number(num);
        let v = isNaN(retNumber) ? '0' : retNumber.toLocaleString();
        return v;
    }
}