import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    public apiHost = 'http://lk.sana-karelia.ru/api';
    public pageContainerClass = 'container-fluid';

    constructor() {}

    // Отдать элемент конфига
    public get(key: string): string {

        return this[key];

    }

    // Задать элемент конфига
    public set(key: string, value: any): string {

        this[key] = value;

        return this[key];

    }

}
