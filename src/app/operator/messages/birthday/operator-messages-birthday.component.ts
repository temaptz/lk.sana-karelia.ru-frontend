import { Component, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { MessagesBirthdayService } from '../../../services/messages-birthday.service';
import { LoadingService } from '../../../services/loading.service';


@Component({
    selector: 'my-operator-messages-birthday',
    templateUrl: './operator-messages-birthday.component.html'
})
export class OperatorMessagesBirthdayComponent implements OnInit {

    public messages: any = null;
    public filterSearch: string = null;

    constructor(
        private messagesBirthdayService: MessagesBirthdayService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService,
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getMessages();
        }, 0);
    }

    // Изменить фильтрацию сообщений
    changeFilter(search: string): void {
        this.filterSearch = search;
        this.getMessages();
    }

    // Очистить фильтрацию сообщений
    clearFilter(): void {
        this.filterSearch = null;
        this.getMessages();
    }

    // Получить список сообщений
    getMessages(): void {
        this.loadingService.startLoading();

        this.messagesBirthdayService
            .getMessages(this.filterSearch)
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

}
