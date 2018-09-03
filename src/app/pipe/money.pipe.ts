import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myMoney'
})
export class MoneyPipe implements PipeTransform {
    transform(value) {
        if ( !value || !(!isNaN(parseFloat(value)) && isFinite(value)) ) {
            return value;
        }

        return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    }
}
