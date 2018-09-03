import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-naim-ue',
    templateUrl: './act-naim-ue.component.html'
})
export class ActNaimUeComponent {
    @Input() actData: any;

    constructor() { }

}
