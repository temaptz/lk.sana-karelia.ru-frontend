import { Component, OnInit, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './services';
import { LoadingService } from './services/loading.service';
import { ConfigService } from './services/config.service';

import '../style/app.scss';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @HostBinding('class')

    public bodyClass: string;

    constructor(
        public configService: ConfigService,
        private authService: AuthService,
        private loadingService: LoadingService,
        private location: Location
    ) {}

    ngOnInit() {
        this.authService.init();

        this.redirect();

        this.subscribeLoadingService();
    }

    // Произвести нужный редирект
    redirect(): void {
        if ( this.location.path().indexOf('/direct/') !== -1 ) {
            return;
        } else if ( this.authService.loggedIn ) {
            this.authService.navigateToRolePage();
        } else {
            if ( this.location.path().indexOf('/login') === -1 ) {
                this.authService.navigateToLoginPage();
            }
        }
    }

    // Подписаться на изменение состояния при подгрузке данных
    subscribeLoadingService(): void {
        this.loadingService.isLoading
            .subscribe(
                (val) => {
                    if ( val ) {
                        this.bodyClass = 'disable-scroll';
                    } else {
                        this.bodyClass = null;
                    }
                }
            );
    }

}
