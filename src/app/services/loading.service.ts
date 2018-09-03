import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class LoadingService {

    public isLoading: Subject<boolean> = new BehaviorSubject(false);
    public bodyClass: string;
    private loadingStart: number = this.getMicrotime();

    constructor() {}

    // Начать показывать загрузку
    public startLoading(): void {

        this.isLoading.next(true);

        this.loadingStart = this.getMicrotime();

    }

    // Показать конец загрузки
    public endLoading(): void {

        this.isLoading.next(false);

        // let time = this.getMicrotime() - this.loadingStart;
        //
        // console.log(time);

    }

    private getMicrotime(): number {
        return Date.now();
    }

}
