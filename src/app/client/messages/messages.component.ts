import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { MessagesService } from '../../services/messages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
    @ViewChild('message')
    message: any;

    public messages: any = null;
    public messageId: number = null;

    constructor(
        private loadingService: LoadingService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private messagesService: MessagesService,
        public modalService: NgbModal
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getMessages();
        }, 0);
    }

    // Получить список сообщений
    getMessages(): void {
        this.loadingService.startLoading();

        this.messagesService
            .getMyMessages()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success ) {

                        this.messages = resp.data;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось получить список сообщений.', BootstrapAlertType.DANGER);

                    }

                    this.loadingService.endLoading();
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Неизвестная ошибка при получении списка сообщений', BootstrapAlertType.DANGER);

                    this.loadingService.endLoading();
                });
    }

    // Просмотр сообщения
    viewMessage(id: number): void {
        this.messageId = id;
        this.modalService
            .open(this.message)
            .result.then(
                () => {
                    this.getMessages();
                }, () => {
                    this.getMessages();
                }
            );
    }

}
