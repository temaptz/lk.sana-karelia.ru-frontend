import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '.././services';
import { MessagesService } from '../services/messages.service';
import { ConfigService } from '../services/config.service';

@Component({
    selector: 'my-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

    public countUnreadMessages: number = null;

    constructor(
        public authService: AuthService,
        public messagesService: MessagesService,
        private configService: ConfigService
    ) {
        this.authService.init();
        this.configService.set('pageContainerClass', 'container');
    }

    ngOnInit() {
        Observable
            .timer(100, 60 * 1000)
            .subscribe(
                () => {
                    this.messagesService.updateCountUnreadMessages();
                }
            );
    }

}
