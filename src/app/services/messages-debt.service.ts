import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class MessagesDebtService {

    private apiHost: string = null;
    private apiResource = '/messages_debt';

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

    // Получение сообщения по id
    getMessage(id: number): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Отправить сообщение
    sendMessage(id: number): Observable<any> {
        let url = this.apiHost + this.apiResource + '/send/' + id + '?token=' + this.authService.token;

        return this.http
            .put(url, {})
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

    // Отправить сообщения пакетно
    sendMessagesBatch(ids: any): Observable<any> {
        let url = this.apiHost + this.apiResource + '/send/' + '?token=' + this.authService.token;

        return this.http
            .put(url, JSON.stringify(ids))
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Удалить сообщения пакетно
    deleteMessagesBatch(ids: any): Observable<any> {
        let url = this.apiHost + this.apiResource + '/' + '?token=' + this.authService.token;

        return this.http
            .delete(url, {
                body : JSON.stringify(ids)
            })
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
