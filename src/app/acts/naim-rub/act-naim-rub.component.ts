import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-naim-rub',
    templateUrl: './act-naim-rub.component.html'
})
export class ActNaimRubComponent {
    @Input() actData: any;

    constructor() { }

}
