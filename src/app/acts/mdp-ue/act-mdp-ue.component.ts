import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-mdp-ue',
    templateUrl: './act-mdp-ue.component.html'
})
export class ActMdpUeComponent {
    @Input() actData: any;

    constructor() { }

}
