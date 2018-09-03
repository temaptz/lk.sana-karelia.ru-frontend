import { Component, OnInit } from '@angular/core';
import { ServerService } from '.././services';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';

@Component({
    selector: 'my-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public time: string = null;

    constructor(
        private serverService: ServerService,
        private bootstrapGrowlService: BootstrapGrowlService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getTime();
        }, 0);
    }

    getTime(): void {
        this.serverService
            .getTime()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data && resp.data.time ) {

                        this.time = resp.data.time;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось получить текущее время время', BootstrapAlertType.DANGER);

                    }

                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Ошибка при получении текущего времени', BootstrapAlertType.DANGER);

                });
    }

}
