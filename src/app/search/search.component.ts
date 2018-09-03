import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output() search = new EventEmitter();
    @Output() clear  = new EventEmitter();


    public text: string = null;

    constructor() { }

    ngOnInit() { }

    // Произвести поиск
    onSearch() {
        this.search.emit(this.text);
    }

    // Очистить поиск
    onClear() {
        this.text = null;
        this.clear.emit();
    }

}
