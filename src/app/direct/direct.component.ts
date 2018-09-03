import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '.././services';
import { DirectService } from '../services/direct.service';

@Component({
    selector: 'my-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss']
})
export class DirectComponent implements OnInit {

    hash: string;

    constructor(
        private authService: AuthService,
        private directService: DirectService,
        private route: ActivatedRoute
    ) {
        this.authService.init();
    }

    ngOnInit() {
        this.hash = this.route.snapshot.params['id'];

        this.authService.clearUserData();
        this.authService.saveUserData({direct_token : this.hash});

        this.checkDirectToken();
    }

    // Проверить секретный токен
    checkDirectToken() {
        this.directService
            .checkDirectToken()
            .subscribe(
                (resp) => {
                    if ( !resp || !resp.success ) {
                        this.authService.logout();
                    }
                },
                () => {
                    this.authService.logout();
                }
            );
    }

}
