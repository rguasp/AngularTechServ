import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathRound'
})
export class MathRoundPipe implements PipeTransform {

  transform(value: number) {
    // return Math.round(value).toFixed(5);
    return value.toFixed(4);
}

}
