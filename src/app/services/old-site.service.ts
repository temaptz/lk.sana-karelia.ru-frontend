import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class OldSiteService {

    private apiHost: string = null;
    private apiResource = '/old_site';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Загрузить файл актов сверки в СТАРУЮ версию
    uploadActs(file) {
        let url = this.apiHost + this.apiResource + '/upload_acts?token=' + this.authService.token;
        let input = new FormData();
        input.append('file', file);

        return this.http
            .post(url, input)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
