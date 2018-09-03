import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-uep-ue',
    templateUrl: './act-uep-ue.component.html'
})
export class ActUepUeComponent {
    @Input() actData: any;

    constructor() { }

}
