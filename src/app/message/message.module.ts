import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './message.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
        MessageComponent
    ],
    exports: [
        MessageComponent
    ]
})
export class MessageModule { }
