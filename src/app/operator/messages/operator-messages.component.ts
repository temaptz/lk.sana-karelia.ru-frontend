import { Component } from '@angular/core';

@Component({
    selector: 'my-operator-messages',
    templateUrl: './operator-messages.component.html'
})
export class OperatorMessagesComponent {

    public currentView = 'personal';

    constructor() { }

    setView(view) {
        this.currentView = view;
    }

}
