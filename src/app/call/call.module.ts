import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderModule } from '../header/header.module';
import { SearchModule } from '../search/search.module';
import { MoneyPipeModule } from '../pipe/moneyPipe.module';

import { CallService } from '../services/call.service';
import { LoadingService } from '../services/loading.service';

import { CallComponent } from './call.component';
import { CallZhekComponent } from './zhek/call-zhek.component';
import { CallSanaComponent } from './sana/call-sana.component';

const callRoutes: Routes = [
    {
        path: 'call',
        component: CallComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(callRoutes),
        CommonModule,
        NgbModule,
        FormsModule,
        HeaderModule,
        SearchModule,
        MoneyPipeModule
    ],
    declarations: [
        CallComponent,
        CallZhekComponent,
        CallSanaComponent
    ],
    providers: [
        CallService,
        LoadingService
    ],
    entryComponents: [],
    exports: [
        RouterModule
    ]
})
export class CallModule { }
