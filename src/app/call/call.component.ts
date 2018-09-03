import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'my-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
    @ViewChild('callZhekCom') callZhekCom;
    @ViewChild('callSanaCom') callSanaCom;

    private searchText: string = null;
    private tabId = 'tab-zhek';

    constructor() {}

    ngOnInit() {}

    // Изменилось поле поискового запроса
    changeSearch(text?: string): void {
        if ( text ) {
            this.searchText = text;
        }

        if ( this.tabId === 'tab-zhek' ) {
            this.callZhekCom.update(this.searchText);
        } else if ( this.tabId === 'tab-sana' ) {
            this.callSanaCom.update(this.searchText);
        }
    }

    // Очищено поле поискового запроса
    clearSearch(): void {
        this.searchText = null;

        this.changeSearch();
    }

    // Сменилас вкладка
    tabChange($event: any): void {
        this.tabId = $event.nextId;
        this.changeSearch();
    }

}
