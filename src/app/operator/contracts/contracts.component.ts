import { Component, OnInit, ViewChild } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractsService } from '../../services/contracts.service';
import { LoadingService } from '../../services/loading.service';
import { DirectService } from '../../services/direct.service';

@Component({
    selector: 'my-contracts',
    templateUrl: './contracts.component.html'
})
export class ContractsComponent implements OnInit {
    @ViewChild('fileInput')
    fileInput: any;

    @ViewChild('secretUrlModal')
    secretUrlModal: any;

    public successMessages: any = null;
    public errorMessages: any   = null;
    public searchText: string   = null;
    public contractsData: any   = null;
    public secretUrl: string    = null;
    private file: any           = null;

    constructor(
        private contractsService: ContractsService,
        private directService: DirectService,
        private loadingService: LoadingService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getContracts();
        }, 0);
    }

    // Выбран файл для загрузки
    fileChange(event) {
        this.file = event.target.files[0];
    }

    // Загрузить файл регистров сведений
    fileUpload() {
        this.loadingService.startLoading();

        this.contractsService
            .uploadContracts(this.file)
            .subscribe(
                (resp) => {

                    this.showMessages(resp);

                    this.fileInput.nativeElement.value = '';
                    this.loadingService.endLoading();
                    this.getContracts();
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

    // Получить все договора
    getContracts() {
        this.loadingService.startLoading();

        this.contractsService
            .getContracts(this.searchText)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.contractsData = resp.data;

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

    // Поиск
    search(text: string): void {
        this.searchText = text;
        this.getContracts();
    }

    // Очистить поисковую строку
    clearSearch(): void {
        this.searchText = null;
        this.getContracts();
    }

    // Предоставить доступ к договору
    createAccess(id) {
        let confirmation = confirm('Создать секретную ссылку для доступа к договору?');

        if ( !confirmation ) {
            return;
        }

        this.directService
            .getLink(id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data && resp.data.url ) {

                        this.showSecretLink(resp.data.url);

                    } else if (resp && resp.errors) {

                        this.errorMessages = resp.errors;

                    } else {

                        this.showRequestError();

                    }
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showRequestError(error.statusText);

                    } else {

                        this.showRequestError();

                    }
                }

            );
    }

    // Удалить договор
    deleteContract(id) {
        let confirmation = confirm('Вы уверенны что следует удалить этот договор?');

        if ( !confirmation ) {
            return;
        }

        this.contractsService
            .deleteContract(id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.messages ) {

                        this.successMessages = resp.mesages;

                    } else if (resp && resp.errors) {

                        this.errorMessages = resp.errors;

                    } else {

                        this.showRequestError();

                    }

                    this.getContracts();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showRequestError(error.statusText);

                    } else {

                        this.showRequestError();

                    }

                    this.getContracts();
                }

            );
    }

    // Показать сообщения от сервера
    showMessages(resp) {
        if ( resp ) {
            this.successMessages = resp.messages || null;
            this.errorMessages = resp.errors || null;
        }
    }

    // Паказать ошибку обработки запроса
    showRequestError(text = '') {
        this.bootstrapGrowlService
            .addAlert('Произошла ошибка обработки запроса. ' + text, BootstrapAlertType.DANGER);
    }

    // Просмотр сообщения
    showSecretLink(link: string): void {
        this.secretUrl = link;
        this.modalService.open(this.secretUrlModal);
    }

}
