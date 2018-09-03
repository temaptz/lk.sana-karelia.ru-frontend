import { Component, OnInit, ViewChild } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { ActsService } from '../../services/acts.service';
import { LoadingService } from '../../services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewActModalComponent } from '../modal/view-act/view-act-modal.component';
import { OldSiteService } from '../../services/old-site.service';

@Component({
    selector: 'my-acts',
    templateUrl: './acts.component.html'
})
export class ActsComponent implements OnInit {
    @ViewChild('fileInput')
    fileInput: any;

    @ViewChild('oldFileInput')
    oldFileInput: any;

    public successMessages: any   = null;
    public errorMessages: any     = null;
    public searchText: string     = null;
    public actsData: any          = null;
    public uploadOldCollapsed     = true;
    private file: any             = null;
    private oldFile: any          = null;
    public oldSiteMessage: string = null;

    constructor(
        private bootstrapGrowlService: BootstrapGrowlService,
        private actsService: ActsService,
        private loadingService: LoadingService,
        private modalService: NgbModal,
        private oldSiteService: OldSiteService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getActs();
        }, 0);
    }

    // Выбран файл для загрузки
    fileChange(event) {
        this.file = event.target.files[0];
    }

    // Загрузить файл актов сверки
    fileUpload() {
        this.loadingService.startLoading();

        this.actsService
            .uploadActs(this.file)
            .subscribe(
                (resp) => {

                    this.showMessages(resp);

                    this.fileInput.nativeElement.value = '';
                    this.loadingService.endLoading();
                    this.getActs();
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

    // Выбран файл для загрузки на СТАРЫЙ сайт
    oldFileChange(event) {
        this.oldFile = event.target.files[0];
    }

    // Загрузить файл актов сверки на СТАРЫЙ сайт
    oldFileUpload() {
        this.loadingService.startLoading();

        this.oldSiteService
            .uploadActs(this.oldFile)
            .subscribe(
                (resp) => {

                    if ( resp && resp.success && resp.data && resp.data.response ) {
                        this.oldSiteMessage = '<p><b>Загружен файл старых актов. Получен ответ от старого сайта:</b></p>'
                            + resp.data.response;
                    }

                    this.oldFileInput.nativeElement.value = '';
                    this.uploadOldCollapsed = true;
                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showRequestError(error.statusText);

                    } else {

                        this.showRequestError();

                    }

                    this.uploadOldCollapsed = true;
                    this.loadingService.endLoading();
                });
    }

    // Получить все акты сверок
    getActs() {
        this.loadingService.startLoading();

        this.actsService
            .getActs(this.searchText)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.actsData = resp.data;

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
        this.getActs();
    }

    // Очистить поисковую строку
    clearSearch(): void {
        this.searchText = null;
        this.getActs();
    }

    // Удалить акт
    deleteAct(id) {
        let confirmation = confirm('Вы уверенны что следует удалить этот акт?');

        if ( !confirmation ) {
            return;
        }

        this.actsService
            .deleteAct(id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.messages ) {

                        this.successMessages = resp.messages;

                    } else if (resp && resp.errors) {

                        this.errorMessages = resp.messages;

                    } else {

                        this.showRequestError();

                    }

                    this.getActs();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showRequestError(error.statusText);

                    } else {

                        this.showRequestError();

                    }

                    this.getActs();
                }

            );
    }

    // Просмотреть акт
    viewAct(id) {
        const modalRef = this.modalService.open(ViewActModalComponent, {size: 'lg'});
        modalRef.componentInstance.id = id;
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

}
