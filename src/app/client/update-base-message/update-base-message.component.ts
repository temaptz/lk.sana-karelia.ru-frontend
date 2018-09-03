import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
    selector: 'my-update-base-message',
    templateUrl: './update-base-message.component.html',
    styleUrls: ['./update-base-message.component.scss']
})
export class UpdateBaseMessageComponent implements OnInit {

    public isUpdatePeriod = false;

    constructor(
        private serverService: ServerService
    ) { }

    ngOnInit() {
        this.getState();
    }

    // Получить данные акта сверки
    getState() {
        this.serverService
            .getUpdateBaseState()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data && resp.data.is_update_period ) {

                        this.isUpdatePeriod = true;

                    }
                });
    }

}
