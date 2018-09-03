import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-uep-rub',
    templateUrl: './act-uep-rub.component.html'
})
export class ActUepRubComponent {
    @Input() actData: any;

    constructor() { }

}
