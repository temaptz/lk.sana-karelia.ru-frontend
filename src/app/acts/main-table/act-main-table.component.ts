import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'my-act-main-table',
    templateUrl: './act-main-table.component.html'
})
export class ActMainTableComponent implements OnInit {
    @Input() tableData: any;

    constructor() { }

    ngOnInit() { }

}
