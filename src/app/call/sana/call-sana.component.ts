import { Component, OnInit, ViewChild } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallService } from '../../services/call.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading.service';
import { ViewActModalComponent } from '../../operator/modal/view-act/view-act-modal.component';

@Component({
    selector: 'my-call-sana',
    templateUrl: './call-sana.component.html',
    styleUrls: ['./call-sana.component.scss']
})
export class CallSanaComponent implements OnInit {
    @ViewChild('modalContent') modalContent: any;

    public search: string = null;
    public contracts: any = null;
    public count = 0;
    public templateUrl: any = null;

    constructor(
        private bootstrapGrowlService: BootstrapGrowlService,
        private modalService: NgbModal,
        private callService: CallService,
        private sanitizer: DomSanitizer,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {}

    // Обновить данные
    update(search: string): void {
        if ( search === this.search ) {
            return;
        }
        this.search = search;
        this.getData();
    }

    // Получить данные
    getData(): void {
        this.loadingService.startLoading();

        this.callService
            .getSana(this.search)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.contracts = resp.data;
                        this.count = this.contracts.length;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при получении данных.');

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при получении данных.');

                    }

                    this.loadingService.endLoading();
                });
    }

    // Показать квитанцию
    showAct(act: any): void {
        if ( act.id ) {

            const modalRef = this.modalService.open(ViewActModalComponent, {size: 'lg'});
            modalRef.componentInstance.id = act.id;

        } else if ( act.template ) {

            this.templateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(act.template);
            this.modalService.open(this.modalContent, {size : 'lg'});

        }
    }

    // Показать сообщение об успехе
    showSuccess(message: string): void {
        this.bootstrapGrowlService
            .addAlert(message, BootstrapAlertType.SUCCESS);
    }

    // Показать сообщение об ошибке
    showError(error: string): void {
        this.bootstrapGrowlService
            .addAlert(error, BootstrapAlertType.DANGER);
    }

}
