import { Component, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { MessagesDebtService } from '../../../services/messages-debt.service';
import { LoadingService } from '../../../services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewActModalComponent } from '../../modal/view-act/view-act-modal.component';


@Component({
    selector: 'my-operator-messages-sms',
    templateUrl: './operator-messages-sms.component.html'
})
export class OperatorMessagesSmsComponent implements OnInit {

    public messages: any = null;
    public filterStatus = 'all';
    public filterSearch: string = null;
    public selectAll = false;

    constructor(
        private messagesDebtService: MessagesDebtService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService,
        private modalService: NgbModal
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

    // Получить список сообщений
    getMessages(): void {
        this.loadingService.startLoading();

        this.messagesDebtService
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

    // Показать акт
    viewAct(id: number): void {
        const modalRef = this.modalService.open(ViewActModalComponent, {size: 'lg'});
        modalRef.componentInstance.id = id;
    }

    // Отправка сообщений
    sendMessages(id?: number): void {

        if ( id ) {

            // Отправка одного сообщения

            this.loadingService.startLoading();

            this.messagesDebtService
                .sendMessage(id)
                .subscribe(
                    (resp) => {
                        if ( resp && resp.success ) {

                            this.bootstrapGrowlService
                                .addAlert('Сообщение отправлено.', BootstrapAlertType.SUCCESS);

                        } else {

                            this.bootstrapGrowlService
                                .addAlert('Не удалось отправить сообщение.', BootstrapAlertType.DANGER);

                        }

                        this.loadingService.endLoading();
                        this.getMessages();
                    },
                    () => {

                        this.bootstrapGrowlService
                            .addAlert('Неизвестная ошибка при отправке сообщения', BootstrapAlertType.DANGER);

                        this.loadingService.endLoading();
                    });

        } else {

            // Отправка списка сообщений

            let ids = this.getSelected();

            if ( ids.length === 0 ) {
                this.bootstrapGrowlService
                    .addAlert('Не выбрано ни одного сообщения', BootstrapAlertType.DANGER);
                return;
            }

            this.loadingService.startLoading();

            this.messagesDebtService
                .sendMessagesBatch(ids)
                .subscribe(
                    (resp) => {
                        if ( resp && resp.success ) {

                            this.bootstrapGrowlService
                                .addAlert('Сообщения отправлены.', BootstrapAlertType.SUCCESS);

                        } else {

                            this.bootstrapGrowlService
                                .addAlert('Не удалось отправить некоторые сообщения.', BootstrapAlertType.DANGER);

                        }

                        this.loadingService.endLoading();
                        this.getMessages();
                    },
                    () => {

                        this.bootstrapGrowlService
                            .addAlert('Неизвестная ошибка при отправке сообщений', BootstrapAlertType.DANGER);

                        this.loadingService.endLoading();
                    });

        }
    }

    // Удаление сообщений
    deleteMessages(id?: number): void {

        if ( id ) {

            // Удаление одного сообщения

            this.loadingService.startLoading();

            this.messagesDebtService
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

        } else {

            // Удаление списка сообщений

            let ids = this.getSelected();

            if ( ids.length === 0 ) {
                this.bootstrapGrowlService
                    .addAlert('Не выбрано ни одного сообщения', BootstrapAlertType.DANGER);
                return;
            }

            this.loadingService.startLoading();

            this.messagesDebtService
                .deleteMessagesBatch(ids)
                .subscribe(
                    (resp) => {
                        if ( resp && resp.success ) {

                            this.bootstrapGrowlService
                                .addAlert('Сообщения удалены.', BootstrapAlertType.SUCCESS);

                        } else {

                            this.bootstrapGrowlService
                                .addAlert('Не удалось удалить сообщения.', BootstrapAlertType.DANGER);

                        }

                        this.loadingService.endLoading();
                        this.getMessages();
                    },
                    () => {

                        this.bootstrapGrowlService
                            .addAlert('Неизвестная ошибка при удалении сообщений', BootstrapAlertType.DANGER);

                        this.loadingService.endLoading();
                    });

        }


    }

    // Сформировать список выделенных сообщений
    getSelected() {
        let ids = [];

        this.messages.forEach((m) => {
            if ( m.selected ) {
                ids.push(m.id);
            }
        });

        return ids;
    }

    // Отметить (снять отметку) все сообщения
    toggleSelectAll() {
        this.messages.forEach((m) => {
            m.selected = this.selectAll;
        });
    }

}
