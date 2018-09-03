import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperatorCreatePersonalMessageModalComponent } from '../../modal/create-personal-message/create-personal-message-modal.component';
import { MessagesService } from '../../../services/messages.service';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { LoadingService } from '../../../services/loading.service';
import { OperatorViewPersonalMessageModalComponent } from '../../modal/view-personal-message/view-personal-message-modal.component';


@Component({
    selector: 'my-operator-messages-personal',
    templateUrl: './operator-messages-personal.component.html'
})
export class OperatorMessagesPersonalComponent implements OnInit {

    public messages: any = null;
    public filterStatus = 'all';
    public filterSearch: string = null;

    constructor(
        private modalService: NgbModal,
        private messagesService: MessagesService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getMessages();
        }, 0);
    }

    // Изменить фильтрацию сообщений
    changeFilter(text?: string): void {
        if ( text ) {
            this.filterSearch = text;
        }
        this.getMessages();
    }

    // Очистить фильтрацию сообщений
    clearFilter(): void {
        this.filterStatus = 'all';
        this.filterSearch = null;
        this.getMessages();
    }

    // Создать сообщение
    createMessage(): void {
        this.modalService
            .open(OperatorCreatePersonalMessageModalComponent, {size: 'sm'})
            .result.then(
                () => {
                    this.getMessages();
                }, () => {}
            );
    }

    // Получить список сообщений
    getMessages(): void {
        this.loadingService.startLoading();

        this.messagesService
            .getMessages(this.filterStatus, this.filterSearch)
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

    // Удаление сообщения
    deleteMessage(id: number): void {
        this.loadingService.startLoading();

        this.messagesService
            .deleteMessage(id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success ) {

                        this.bootstrapGrowlService
                            .addAlert('Сообщение удалено.', BootstrapAlertType.SUCCESS);

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось удалить сообщение.', BootstrapAlertType.DANGER);

                    }

                    this.loadingService.endLoading();
                    this.getMessages();
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Неизвестная ошибка при удалении сообщения', BootstrapAlertType.DANGER);

                    this.loadingService.endLoading();
                });
    }

    // Просмотр сообщения
    viewMessage(message: any): void {
        const modalRef = this.modalService.open(OperatorViewPersonalMessageModalComponent, {size: 'sm'});
        modalRef.componentInstance.message = message;
    }

}
