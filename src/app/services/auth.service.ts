import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';

import { ConfigService } from './config.service';

@Injectable()
export class AuthService {

    public login: string        = null;
    public password: string     = null;
    public name: string         = null;
    public roles: string[]      = [];
    public loggedIn             = false;
    public token: string        = null;
    public direct_token: string = null;

    private apiHost: string = null;
    private apiResource = '/users';

    constructor(
        private http:   Http,
        private config: ConfigService,
        private router: Router
    ) {
        this.apiHost = this.config.get('apiHost');
    }

    // Проверка данных пользователя. Если их нет, то попытаемся их получить
    init(): any {
        if ( !this.login || !this.name || !this.roles || !this.token || !this.loggedIn ) {
            return this.getUserData();
        }
    }

    // Авторизация
    signIn(): Observable<any> {
        let params = new URLSearchParams();

        params.set('login', this.login);
        params.set('password', this.password);

        let url    = this.apiHost + this.apiResource + '/signin?' + params.toString();

        return this.http.get(url)
            .map((res) => res.json())
            .catch((error) => {
                return Observable.throw(error);
            });
    }

    // Смена пароля
    changePassword(oldPassword: string, newPassword: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let params  = new URLSearchParams();
        let url     = this.apiHost + this.apiResource + '/password?token=' + this.token;

        params.set('old', oldPassword);
        params.set('new', newPassword);

        return this.http.put(url, params.toString(), { headers: headers })
            .map((res) => res.json())
            .catch((error) => {
                return Observable.throw(error);
            });
    }

    // Сохранение данных авторизации
    saveUserData(data: any): void {
        this.name         = data.name || null;
        this.roles        = data.roles || [];
        this.loggedIn     = this.checkLoggedIn() || false;
        this.token        = data.token || null;
        this.direct_token = data.direct_token || null;


        this.saveParamToStorage('login', this.login);
        this.saveParamToStorage('name',  this.name);
        this.saveParamToStorage('roles', JSON.stringify(this.roles));
        this.saveParamToStorage('token', this.token);
        this.saveParamToStorage('direct_token', this.direct_token);
    };

    // Получение данных авторизации
    getUserData(): any {
        this.login        = localStorage.getItem('login');
        this.name         = localStorage.getItem('name');
        this.roles        = JSON.parse(localStorage.getItem('roles'));
        this.loggedIn     = this.checkLoggedIn();
        this.token        = localStorage.getItem('token');
        this.direct_token = localStorage.getItem('direct_token');

        return {
            login        : this.login,
            name         : this.name,
            roles        : this.roles,
            loggedIn     : this.loggedIn,
            token        : this.token,
            direct_token : this.direct_token
        };
    }

    // Очистка авторизации
    clearUserData(): void {
        this.login        = null;
        this.name         = null;
        this.roles        = null;
        this.loggedIn     = false;
        this.token        = null;
        this.direct_token = null;

        this.removeParamFromStorage('login');
        this.removeParamFromStorage('name');
        this.removeParamFromStorage('roles');
        this.removeParamFromStorage('loggedIn');
        this.removeParamFromStorage('token');
        this.removeParamFromStorage('direct_token');
    }

    // Выход из системы
    logout(): void {
        this.clearUserData();
        this.navigateToLoginPage();
    }

    // Проверить, залогинен ли пользователь
    checkLoggedIn(): boolean {
        if (
            this.token
            && this.roles.length > 0
        ) {
            return true;
        }

        return false;
    }

    // Перейти на страницу соответствующей роли
    navigateToRolePage(): void {
        let roles = ['admin', 'operator', 'call', 'client'];
        let target = null;
        let contin = false;

        roles.forEach((role) => {
            if ( !contin && this.roles.indexOf(role) !== -1 ) {
                target = role;
                contin = true;
            }
        });

        if ( target ) {
            this.router.navigateByUrl(target);
        } else {
            this.navigateToLoginPage();
        }
    }

    // Перейти на страницу лонина
    navigateToLoginPage(): void {
        this.router.navigateByUrl('login');
    }

    // Сохранить значение в хранилище
    saveParamToStorage(key: string, value: any): void {
        if ( value && value !== 'null' && value !== 'undefined' ) {
            localStorage.setItem(key, value);
        }
    }

    // Удалить значение из хранилища
    removeParamFromStorage(key: string): void {
        localStorage.removeItem(key);
    }

}
