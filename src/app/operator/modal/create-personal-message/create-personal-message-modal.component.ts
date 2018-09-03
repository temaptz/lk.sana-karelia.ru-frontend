import { Component, ViewChild, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../../services/loading.service';
import { UsersService } from '../../../services/users.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
    selector: 'my-create-personal-message-modal',
    templateUrl: './create-personal-message-modal.component.html'
})
export class OperatorCreatePersonalMessageModalComponent implements OnInit {
    @ViewChild('fileInput')
    fileInput: any;

    public dataToAll   = false;
    public dataToUser  = null;
    public dataSubject = null;
    public dataText    = null;
    public dataFile    = null;
    public userList    = null;

    constructor(
        public activeModal: NgbActiveModal,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService,
        private usersService: UsersService,
        private messagesService: MessagesService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getClients();
        }, 0);
    }

    // Выбран файл для отправки
    fileChange(event): void {
        this.dataFile = event.target.files[0];
    }

    // Отправить это сообщение
    submitMessage(): void {
        this.loadingService.startLoading();

        this.messagesService.sendMessage(this.dataToAll, this.dataToUser, this.dataSubject, this.dataText, this.dataFile)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success ) {

                        this.bootstrapGrowlService
                            .addAlert('Сообщение успешно отправлено.', BootstrapAlertType.SUCCESS);

                        this.activeModal.close(true);

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось отправить ообщение.', BootstrapAlertType.DANGER);

                    }

                    this.loadingService.endLoading();
                    this.fileInput.nativeElement.value = '';
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Неизвестная ошибка при отправке сообщения', BootstrapAlertType.DANGER);

                    this.loadingService.endLoading();
                });
    }

    // Получить все акты сверок
    getClients(): void {
        this.loadingService.startLoading();

        this.usersService
            .getClients()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.userList = resp.data;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.bootstrapGrowlService
                                    .addAlert(error, BootstrapAlertType.DANGER);
                            });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Не удалось получить список клиентов.', BootstrapAlertType.DANGER);

                    }

                    this.loadingService.endLoading();
                },
                () => {

                    this.bootstrapGrowlService
                        .addAlert('Неизвестная ошибка при получении списка клентов', BootstrapAlertType.DANGER);

                    this.loadingService.endLoading();
                });
    }

    // Поставить или убрать галочку Отправить всем
    setToAll(): void {
        if ( this.dataToAll ) {
            this.dataToUser = null;
        }
    }

}
