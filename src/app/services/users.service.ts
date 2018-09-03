import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';


@Injectable()
export class UsersService {

    private apiHost: string = null;
    private apiResource = '/users';

    constructor(
        private http: Http,
        private config: ConfigService,
        private authService: AuthService
    ) {
        this.authService.init();
        this.apiHost = this.config.get('apiHost');
    }

    // Получение списка клиентов
    getClients(): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/clients?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение списка пользователей
    getUsers(role: string, search: string): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);
        params.set('search', search);
        params.set('role', role);

        let url = this.apiHost + this.apiResource + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение списка клиентов
    getRoles(): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/roles?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Получение пользователя
    getUser(id: number): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .get(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Создание пользователя
    createUser(name: string, login: string, password: string, phone: string, email: string, role: string): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let data = {
            name     : name,
            login    : login,
            password : password,
            phone    : phone,
            email    : email,
            role     : role
        };

        let url = this.apiHost + this.apiResource + '?' + params.toString();

        return this.http
            .post(url, data)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Обновление пользователя
    updateUser(id: number, name: string, login: string, password: string, phone: string, email: string, role: string, isActive: boolean): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let data = {
            name      : name,
            login     : login,
            password  : password,
            phone     : phone,
            email     : email,
            role      : role,
            is_active : isActive
        };

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .put(url, data)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

    // Удаление пользователя
    deleteUser(id: number): Observable<any> {
        let params = new URLSearchParams();

        params.set('token', this.authService.token);

        let url = this.apiHost + this.apiResource + '/' + id + '?' + params.toString();

        return this.http
            .delete(url)
            .map((res) => res.json())
            .catch((error) => Observable.throw(error));
    }

}
