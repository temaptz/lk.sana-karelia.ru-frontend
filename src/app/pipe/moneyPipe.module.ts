import { NgModule } from '@angular/core';
import { MoneyPipe } from './money.pipe';

@NgModule({
    imports: [],
    declarations: [
        MoneyPipe
    ],
    providers: [],
    bootstrap: [],
    exports: [
        MoneyPipe
    ]
})
export class MoneyPipeModule {}
