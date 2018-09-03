import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class ActsService {

    private apiHost: string = null;
    private apiResource = '/acts';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение списка актов сверки
    getActs(searchText = null) {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('search', searchText);

        let url = this.apiHost + this.apiResource + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение акта сверки по id
    getAct(id) {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение своего акта сверки
    getMyAct(view) {
        let params = new URLSearchParams();

        if ( this.authService.token ) {
            params.set('token', this.authService.token);
        } else if ( this.authService.direct_token ) {
            params.set('direct_token', this.authService.direct_token);
        }

        let url = this.apiHost + this.apiResource + '/my/' + view + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Загрузить файл актов сверки
    uploadActs(file) {
        let url = this.apiHost + this.apiResource + '/upload?token=' + this.authService.token;
        let input = new FormData();
        input.append('file', file);

        return this.http
            .post(url, input)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Удалить акт
    deleteAct(id) {
        let url = this.apiHost + this.apiResource + '/' + id + '?token=' + this.authService.token;

        return this.http
            .delete(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
