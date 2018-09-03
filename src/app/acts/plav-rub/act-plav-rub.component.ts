import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-plav-rub',
    templateUrl: './act-plav-rub.component.html'
})
export class ActPlavRubComponent {
    @Input() actData: any;

    constructor() { }

}
