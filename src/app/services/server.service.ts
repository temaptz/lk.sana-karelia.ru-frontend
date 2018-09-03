import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class ServerService {

    private apiHost: string = null;
    private apiResource = '/server';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение текущего времени
    getTime(): Observable<any> {
        let params = new URLSearchParams();

        if ( this.authService.token ) {
            params.set('token', this.authService.token);
        } else if ( this.authService.direct_token ) {
            params.set('direct_token', this.authService.direct_token);
        }

        let url = this.apiHost + this.apiResource + '/time?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение текущего состояния об обновлении базы
    getUpdateBaseState(): Observable<any> {
        let params = new URLSearchParams();

        if ( this.authService.token ) {
            params.set('token', this.authService.token);
        } else if ( this.authService.direct_token ) {
            params.set('direct_token', this.authService.direct_token);
        }

        let url = this.apiHost + this.apiResource + '/is_update_period?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
