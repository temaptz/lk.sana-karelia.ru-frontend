import { NgModule }             from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ServerService } from '../services/server.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FooterComponent
    ],
    providers: [
        ServerService
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterModule { }
