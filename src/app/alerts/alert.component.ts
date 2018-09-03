import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() successMessages: any;
    @Input() errorMessages: any;

    constructor() { }

    // Закрыть сообщения об успехах
    closeSuccess() {
        this.successMessages = null;
    }

    // Закрыть сообщения об ошибках
    closeErrors() {
        this.errorMessages = null;
    }

}
