import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'my-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
    @Input() id: number;
    @Input() setAsRead = false;

    public message: any = null;

    constructor(
        private loadingService: LoadingService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private messagesService: MessagesService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Этото таймаут - хак от ангуляровской ошибки, позже можно придумать, как ее обойти.
        setTimeout(() => {
            this.getMessage();
        }, 0);
    }

    // Получить сообщение
    getMessage() {
        this.loadingService.startLoading();

        this.messagesService
            .getMessage(this.id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.message = resp.data;

                        if ( this.setAsRead && this.authService.token ) {
                            setTimeout(() => {
                                this.readMessage();
                            }, 1000);
                        }

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось получить сообщение.', BootstrapAlertType.DANGER);

                    }

                    this.loadingService.endLoading();
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Неизвестная ошибка при получении сообщения.', BootstrapAlertType.DANGER);

                    this.loadingService.endLoading();
                });
    }

    // Отметить сообщение как прочитанное
    readMessage() {
        this.messagesService
            .setAsRead(this.id)
            .subscribe(
                (resp) => {
                    if ( !resp || !resp.success ) {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось отметить сообщение как прочитанное.', BootstrapAlertType.DANGER);

                    }

                    this.messagesService.updateCountUnreadMessages();
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Не удалось отметить сообщение как прочитанное по неизвестной причине.', BootstrapAlertType.DANGER);

                    this.messagesService.updateCountUnreadMessages();

                });
    }

}
