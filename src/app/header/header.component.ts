import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '.././services';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() interface: string = null;

    public availableInterfaces = [];

    constructor(
        public authService: AuthService,
        private router: Router
    ) {
        this.authService.init();
    }

    ngOnInit() {
        if ( this.authService.roles.indexOf('admin') !== -1 ) {
            this.availableInterfaces = [
                {
                    name : 'Оператор',
                    key  : 'operator'
                },
                {
                    name : 'Колл-центр',
                    key  : 'call'
                },
                {
                    name : 'Администратор',
                    key  : 'admin'
                }
            ];
        }
    }

    // Сменить интерфейс
    changeInterface(interfaceKey: string): void {
        this.router.navigateByUrl(interfaceKey);
    }

}
