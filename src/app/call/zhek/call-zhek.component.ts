import { Component, OnInit, ViewChild } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallService } from '../../services/call.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'my-call-zhek',
    templateUrl: './call-zhek.component.html',
    styleUrls: ['./call-zhek.component.scss']
})
export class CallZhekComponent implements OnInit {
    @ViewChild('modalContent') modalContent: any;

    public search: string = null;
    public clients: any = null;
    public count = 0;
    public isCollapsed: any = [];
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
            .getZhek(this.search)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.clients = resp.data;
                        this.count = this.clients.length;
                        this.isCollapsed = [];
                        this.clients.forEach(
                            (c) => {
                                this.isCollapsed[c.user_id] = true;
                            }
                        );

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
    showBill(template: string): void {
        this.templateUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://dom-ptz.ru' + template);
        this.modalService.open(this.modalContent, {size : 'lg'});
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
