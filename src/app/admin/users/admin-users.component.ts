import { Component, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../services/loading.service';
import { UsersService } from '../../services/users.service';
import { AdminCreateUserModalComponent } from '../modal/create-user/create-user-modal.component';

@Component({
    selector: 'my-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    public users: any = null;
    public roles: any = null;
    public selectedRole = 'all';
    public search: string = null;

    constructor(
        private loadingService: LoadingService,
        private bootstrapGrowlService: BootstrapGrowlService,
        private usersService: UsersService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        setTimeout(() => {
            this.getUsers();
            this.getRoles();
        }, 0);
    }

    // Получить список пользователей
    getUsers(): void {
        this.loadingService.startLoading();

        this.usersService
            .getUsers(this.selectedRole, this.search)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        this.users = resp.data;

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при получении списка пользователей.');

                    }

                    this.loadingService.endLoading();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при получении списка пользователей.');

                    }

                    this.loadingService.endLoading();
                });
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
                });
    }

    // Создать пользователя
    createUser(): void {
        this.modalService
            .open(AdminCreateUserModalComponent, {size: 'sm'})
            .result.then(
            () => {
                this.getUsers();
            }, () => {}
        );
    }

    // Редактировать пользователя
    editUser(id: number): void {
        let modalRef = this.modalService
            .open(AdminCreateUserModalComponent, {size: 'sm'});

        modalRef.componentInstance.id = id;

        modalRef.result.then(
            () => {
                this.getUsers();
            }, () => {}
        );
    }

    // Удалить пользователя
    deleteUser(id: number): void {
        let confirmation = confirm('Вы уверенны что следует удалить этого пользователя?');

        if ( !confirmation ) {
            return;
        }

        this.loadingService.startLoading();

        this.usersService
            .deleteUser(id)
            .subscribe(
                (resp) => {
                    if ( resp && resp.success ) {

                        this.showSuccess('Пользователь успешно удален');

                    } else if (resp && resp.errors) {

                        resp.errors
                            .forEach((error) => {
                                this.showError(error);
                            });

                    } else {

                        this.showError('Ошибка при удалении пользователя.');

                    }

                    this.loadingService.endLoading();
                    this.getUsers();
                },
                (error) => {
                    if ( error.statusText ) {

                        this.showError(error.statusText);

                    } else {

                        this.showError('Неизвестная ошибка при удалении пользователя.');

                    }

                    this.loadingService.endLoading();
                });
    }

    // Изменился фильтр пользователей
    changeFilter(text?: string): void {
        if ( text ) {
            this.search = text;
        }
        this.getUsers();
    }

    // Очищен фильтр пользователей
    clearFilter(): void {
        this.search = null;
        this.selectedRole = 'all';
        this.getUsers();
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
