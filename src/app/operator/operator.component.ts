import { Component } from '@angular/core';
import { AuthService } from '.././services';

@Component({
    selector: 'my-client',
    templateUrl: './operator.component.html',
    styleUrls: ['./operator.component.scss']
})
export class OperatorComponent {

    constructor(
        private authService: AuthService
    ) {
        this.authService.init();
    }

}
