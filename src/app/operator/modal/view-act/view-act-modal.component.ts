import { Component, Input, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { ActsService } from '../../../services/acts.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-view-act-modal',
    templateUrl: './view-act-modal.component.html'
})
export class ViewActModalComponent implements OnInit {
    @Input() id;

    public actData: any = null;

    constructor(
        private actsService: ActsService,
        private bootstrapGrowlService: BootstrapGrowlService,
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getAct();
        }, 0);
    }

    // Получить все договора
    getAct() {
        this.actsService
            .getAct(this.id)
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

                        this.bootstrapGrowlService
                            .addAlert('Произошла неизвестная ошибка', BootstrapAlertType.DANGER);

                    }
                },
                (error) => {
                    if ( error.statusText ) {

                        this.bootstrapGrowlService
                            .addAlert('Произошла ошибка:' + error.statusText, BootstrapAlertType.DANGER);

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Произошла непредвиденная ошибка', BootstrapAlertType.DANGER);

                    }
                });
    }
}
