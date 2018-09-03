import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '.././services';
import { ConfigService } from '../services/config.service';
import { BootstrapGrowlService, BootstrapAlertType } from 'ngx-bootstrap-growl';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginButtonDisabled = false;

    constructor(
        public authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private bootstrapGrowlService: BootstrapGrowlService,
        private configService: ConfigService
    ) { }

    ngOnInit() {
        this.authService.clearUserData();

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            let username = params.username,
                password = params.password;

            if ( username && password ) {
                this.authService.login = username;
                this.authService.password = password;

                this.onSubmitForm();
            }
        });

        this.configService.set('pageContainerClass', 'container-fluid');
    }

    // Отправка формы авторизации
    onSubmitForm(): void {
        this.loginButtonDisabled = true;

        this.authService
            .signIn()
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data ) {

                        if ( resp.data.redirect ) {
                            window.location.href = resp.data.redirect;
                            return;
                        }

                        this.authService
                            .saveUserData(resp.data);
                        this.bootstrapGrowlService
                            .addAlert('Добро пожаловать, ' + resp.data.name, BootstrapAlertType.SUCCESS);
                        this.authService
                            .navigateToRolePage();

                    } else if (resp && resp.errors) {

                        resp.errors.forEach((error) => {
                            this.bootstrapGrowlService
                                .addAlert(error, BootstrapAlertType.DANGER);
                        });

                    } else {

                        this.bootstrapGrowlService
                            .addAlert('Произошла неизвестная ошибка', BootstrapAlertType.DANGER);

                    }

                    this.loginButtonDisabled = false;
                },
                (error) => {
                    if ( error.statusText ) {
                        this.bootstrapGrowlService
                            .addAlert('Произошла ошибка:' + error.statusText, BootstrapAlertType.DANGER);
                    } else {
                        this.bootstrapGrowlService
                            .addAlert('При входе произошла непредвиденная ошибка', BootstrapAlertType.DANGER);
                    }

                    this.loginButtonDisabled = false;
                }
            );
    }

}
