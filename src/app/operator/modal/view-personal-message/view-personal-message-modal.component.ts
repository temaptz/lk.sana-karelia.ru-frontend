import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-view-personal-message-modal',
    templateUrl: './view-personal-message-modal.component.html'
})
export class OperatorViewPersonalMessageModalComponent {
    @Input() message: any = null;

    constructor(
        public activeModal: NgbActiveModal
    ) { }

}
