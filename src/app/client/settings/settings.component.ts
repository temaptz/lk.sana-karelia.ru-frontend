import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';
import { AuthService } from '../.././services';

@Component({
    selector: 'my-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {

    passwordCurrent: string = null;
    passwordNew: string = null;
    passwordNewConfirm: string = null;

    constructor(
        public  authService: AuthService,
        private modalService: NgbModal,
        private bootstrapGrowlService: BootstrapGrowlService
    ) {
        this.authService.init();
    }

    openChangePasswordModal(content) {
        this.modalService
            .open(content)
            .result
            .then(
                (result) => {
                    if ( !result ) {
                        return;
                    }
                    this.authService
                        .changePassword(this.passwordCurrent, this.passwordNew)
                        .subscribe(
                            (resp) => {
                                if ( resp.success ) {
                                    this.bootstrapGrowlService
                                        .addAlert('Пароль успешно изменен.', BootstrapAlertType.SUCCESS);
                                } else {
                                    if ( resp.errors ) {
                                        resp.errors.forEach(
                                            error => {
                                                this.bootstrapGrowlService
                                                    .addAlert(error, BootstrapAlertType.DANGER);
                                            }
                                        );
                                    } else {
                                        this.bootstrapGrowlService
                                            .addAlert('Произошла ошибка при смене пароля.', BootstrapAlertType.DANGER);
                                    }
                                }
                            }, () => {
                                this.bootstrapGrowlService
                                    .addAlert('Произошла непредвиденная ошибка при смене пароля.', BootstrapAlertType.DANGER);
                            }
                        );
                },
                () => {}
            );
    }

}
