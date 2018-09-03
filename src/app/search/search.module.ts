import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        SearchComponent
    ],
    providers: [],
    exports: [
        SearchComponent
    ]
})
export class SearchModule { }
