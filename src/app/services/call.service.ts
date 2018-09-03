import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class CallService {

    private apiHost: string = null;
    private apiResource = '/call';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Пооиск клиентов ЖЭК
    getZhek(search: string): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('search', search);

        let url = this.apiHost + this.apiResource + '/zhek?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Пооиск клиентов САНА
    getSana(search: string): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('search', search);

        let url = this.apiHost + this.apiResource + '/sana?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
