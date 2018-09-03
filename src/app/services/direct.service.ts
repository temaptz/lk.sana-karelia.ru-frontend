import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class DirectService {

    private apiHost: string = null;
    private apiResource = '/direct_access';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение секретной ссылки для доступа к договору
    getLink(id: number): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/url/' + id + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Проверка секретного токена
    checkDirectToken(): Observable<any> {
        let url = this.apiHost + this.apiResource + '/check/' + this.authService.direct_token;

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
