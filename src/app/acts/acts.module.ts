import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoneyPipeModule } from '../pipe/moneyPipe.module';

import { ActComponent } from './act.component';
import { ActMdpRubComponent } from './mdp-rub/act-mdp-rub.component';
import { ActMdpUeComponent } from './mdp-ue/act-mdp-ue.component';
import { ActUepRubComponent } from './uep-rub/act-uep-rub.component';
import { ActUepUeComponent } from './uep-ue/act-uep-ue.component';
import { ActNaimRubComponent } from './naim-rub/act-naim-rub.component';
import { ActNaimUeComponent } from './naim-ue/act-naim-ue.component';
import { ActPlavRubComponent } from './plav-rub/act-plav-rub.component';
import { ActMainTableComponent } from './main-table/act-main-table.component';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        MoneyPipeModule
    ],
    declarations: [
        ActComponent,
        ActMdpRubComponent,
        ActMdpUeComponent,
        ActUepRubComponent,
        ActUepUeComponent,
        ActNaimRubComponent,
        ActNaimUeComponent,
        ActPlavRubComponent,
        ActMainTableComponent
    ],
    providers: [],
    entryComponents: [],
    exports: [
        ActComponent
    ],
})
export class ActsModule { }
