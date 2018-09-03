import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class ContractsService {

    private apiHost: string = null;
    private apiResource = '/contracts';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение списка регистров сведений
    getContracts(searchText = null) {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('search', searchText);

        let url = this.apiHost + this.apiResource + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Загрузить файл регистра сведений
    uploadContracts(file) {
        let url = this.apiHost + this.apiResource + '/upload?token=' + this.authService.token;
        let input = new FormData();
        input.append('file', file);

        return this.http
            .post(url, input)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Удалить договор из регистра сведений
    deleteContract(id) {
        let url = this.apiHost + this.apiResource + '/' + id + '?token=' + this.authService.token;

        return this.http
            .delete(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
