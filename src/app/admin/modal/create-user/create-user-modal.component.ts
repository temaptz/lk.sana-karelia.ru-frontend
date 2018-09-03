import { Component, OnInit, Input } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../../services/loading.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'my-create-user-modal',
    templateUrl: './create-user-modal.component.html'
})
export class AdminCreateUserModalComponent implements OnInit {
    @Input() id: number = null;

    public userName: string = null;
    public userLogin: string = null;
    public userPassword: string = null;
    public userPhone: string = null;
    public userEmail: string = null;
    public userRole: string = null;
    public userIsActive = true;

    public roles: any = null;

    public labelWidth = 3;
    public inputWidth = 9;

    constructor(
        public activeModal: NgbActiveModal,
        private bootstrapGrowlService: BootstrapGrowlService,
        private loadingService: LoadingService,
        private usersService: UsersService,
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.getRoles();
            if ( this.id ) {
                this.getUser();
            }
        }, 0);
    }

    // Кнпка сохранения
    submitForm() {
        if ( this.id ) {
            this.updateUser();
        } else {
            this.createUser();
        }
    }

    // Создание пользователя
    createUser() {
        this.loadingService.startLoading();

        this.usersService
            .createUser(this.userName, this.userLogin, this.userPassword, this.userPhone, this.userEmail, this.userRole)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.loadingService.endLoading();
                        this.showSuccess('Пользователь успешно создан.');
                        this.activeModal.close(true);

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при создании пользователя.');

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при создании пользователя.');

                    }

                    this.loadingService.endLoading();
                }
            );
    }

    // Обновление пользователя
    updateUser() {
        this.loadingService.startLoading();

        this.usersService
            .updateUser(this.id, this.userName, this.userLogin, this.userPassword, this.userPhone, this.userEmail, this.userRole, this.userIsActive)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.showSuccess('Пользователь успешно обновлен.');
                        this.loadingService.endLoading();
                        this.activeModal.close(true);

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при обновлении пользователя.');

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при обновлении пользователя.');

                    }

                    this.loadingService.endLoading();
                }
            );
    }

    // Получить список ролей
    getRoles(): void {

        this.usersService
            .getRoles()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.roles = resp.data;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при получении списка ролей.');

                    }
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при получении списка ролей.');

                    }
                }
            );
    }

    // Получение текущего пользователя
    getUser(): void {
        this.loadingService.startLoading();

        this.usersService
            .getUser(this.id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.userName = resp.data.name || null;
                        this.userLogin = resp.data.login || null;
                        this.userPhone = resp.data.phone || null;
                        this.userEmail = resp.data.email || null;
                        this.userRole = resp.data.role || null;
                        this.userIsActive = resp.data.is_active || false;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при получении данных пользователя.');

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при получении данных пользователя.');

                    }

                    this.loadingService.endLoading();
                }
            );
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
