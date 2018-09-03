import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class MessagesService {

    private apiHost: string = null;
    private apiResource = '/messages';
    public countUnreadMessages: number = null;

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение списка сообщений
    getMessages(status: string, search: string): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('status', status);
        params.set('search', search);

        let url = this.apiHost + this.apiResource + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение списка сообщений для пользователя
    getMyMessages(): Observable<any> {
        let params = new URLSearchParams();

        if ( this.authService.token ) {
            params.set('token', this.authService.token);
        } else if ( this.authService.direct_token ) {
            params.set('direct_token', this.authService.direct_token);
        }

        let url = this.apiHost + this.apiResource + '/my?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение сообщения по id
    getMessage(id: number): Observable<any> {
        let params = new URLSearchParams();

        if ( this.authService.token ) {
            params.set('token', this.authService.token);
        } else if ( this.authService.direct_token ) {
            params.set('direct_token', this.authService.direct_token);
        }

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Отправить сообщение
    sendMessage(isToAll: boolean, toUser: number, subject: string, text: string, file: any): Observable<any> {
        let url = this.apiHost + this.apiResource + '?token=' + this.authService.token;
        let input = new FormData();

        input.append('to_all', isToAll.toString());
        input.append('to_user', toUser.toString());
        input.append('subject', subject);
        input.append('text', text);
        input.append('file', file);

        return this.http
            .post(url, input)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Удалить сообщение
    deleteMessage(id: number): Observable<any> {
        let url = this.apiHost + this.apiResource + '/' + id + '?token=' + this.authService.token;

        return this.http
            .delete(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Отметить как прочитанное
    setAsRead(id: number): Observable<any> {
        let url = this.apiHost + this.apiResource + '/read/' + id + '?token=' + this.authService.token;

        return this.http
            .put(url, null)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получить количество непрочитанных сообщений
    updateCountUnreadMessages(): void {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/count_unread' + '?' + params.toString();

        this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error))
            .subscribe(
                (resp) => {
                    if ( resp && resp.success && resp.data && resp.data.count ) {
                        this.countUnreadMessages = resp.data.count;
                    }
                }, () => {}
            );
    }

}
