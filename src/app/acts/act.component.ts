import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act',
    templateUrl: './act.component.html',
    styleUrls: ['./act.component.scss']
})
export class ActComponent {
    @Input() actData: any;

    constructor() { }

}
