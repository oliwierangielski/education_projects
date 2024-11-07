import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noComma'
})

export class NoCommaPipe implements PipeTransform {
    transform(value: string | null): string {
        return (value == null) ? "" : ( ((value[0] == "€") ? "" : "€") + value.replaceAll(",", ""))
    }
}