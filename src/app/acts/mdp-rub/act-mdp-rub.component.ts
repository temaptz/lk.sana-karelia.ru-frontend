import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-act-mdp-rub',
    templateUrl: './act-mdp-rub.component.html'
})
export class ActMdpRubComponent {
    @Input() actData: any;

    constructor() { }

}
