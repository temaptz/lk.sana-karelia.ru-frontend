import { Component, OnInit } from '@angular/core';
import { ActsService } from '../../services/acts.service';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'my-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

    public currentView = '3m';
    public actData: any;

    constructor(
        private actsService: ActsService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService
    ) { }

    setView(viewId) {
        this.currentView = viewId;
        this.getAct();
    }

    ngOnInit() {
        setTimeout(() => {
            this.getAct();
        }, 0);
    }

    // Получить данные акта сверки
    getAct() {
        this.loadingService.startLoading();

        this.actsService
            .getMyAct(this.currentView)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.actData = resp.data;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.showRequestError();

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showRequestError(error.statusText);

                    } else {

                        this.showRequestError();

                    }

                    this.loadingService.endLoading();
                });
    }

    // Паказать ошибку обработки запроса
    showRequestError(text = '') {
        this.bootstrapGrowlService
            .addAlert('Произошла ошибка. ' + text, BootstrapAlertType.DANGER);
    }

    // Напечатать страницу
    printPage() {
        window.print();
    }

}
