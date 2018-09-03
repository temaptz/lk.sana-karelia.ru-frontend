import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OperatorComponent } from './operator.component';
import { ActsComponent } from './acts/acts.component';
import { ContractsComponent } from './contracts/contracts.component';
import { OperatorMessagesComponent } from './messages/operator-messages.component';
import { OperatorMessagesPersonalComponent } from './messages/personal/operator-messages-personal.component';
import { OperatorMessagesSmsComponent } from './messages/sms/operator-messages-sms.component';
import { OperatorMessagesBirthdayComponent } from './messages/birthday/operator-messages-birthday.component';
import { ViewActModalComponent } from './modal/view-act/view-act-modal.component';
import { OperatorCreatePersonalMessageModalComponent } from './modal/create-personal-message/create-personal-message-modal.component';

import { HeaderModule } from '../header/header.module';
import { ActsModule } from '../acts/acts.module';
import { AlertModule } from '../alerts/alert.module';
import { MessageModule } from '../message/message.module';
import { MoneyPipeModule } from '../pipe/moneyPipe.module';
import { SearchModule } from '../search/search.module';

import { ActsService } from '../services/acts.service';
import { ContractsService } from '../services/contracts.service';
import { MessagesDebtService } from '../services/messages-debt.service';
import { MessagesBirthdayService } from '../services/messages-birthday.service';
import { DirectService } from '../services/direct.service';
import { OldSiteService } from '../services/old-site.service';

import { OperatorViewPersonalMessageModalComponent } from './modal/view-personal-message/view-personal-message-modal.component';

const operatorRoutes: Routes = [
    {
        path: 'operator',
        component: OperatorComponent,
        children: [
            {
                path: '',
                redirectTo: 'acts',
                pathMatch: 'full'
            },
            {
                path: 'acts',
                component: ActsComponent
            },
            {
                path: 'contracts',
                component: ContractsComponent
            },
            {
                path: 'messages',
                component: OperatorMessagesComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(operatorRoutes),
        FormsModule,
        NgbModule,
        HeaderModule,
        CommonModule,
        ActsModule,
        AlertModule,
        MessageModule,
        MoneyPipeModule,
        SearchModule
    ],
    declarations: [
        OperatorComponent,
        ActsComponent,
        ContractsComponent,
        OperatorMessagesComponent,
        OperatorMessagesPersonalComponent,
        OperatorMessagesSmsComponent,
        OperatorMessagesBirthdayComponent,
        ViewActModalComponent,
        OperatorCreatePersonalMessageModalComponent,
        OperatorViewPersonalMessageModalComponent
    ],
    providers: [
        ContractsService,
        ActsService,
        MessagesDebtService,
        MessagesBirthdayService,
        DirectService,
        OldSiteService
    ],
    entryComponents: [
        ViewActModalComponent,
        OperatorCreatePersonalMessageModalComponent,
        OperatorViewPersonalMessageModalComponent
    ],
    exports: [
        RouterModule
    ],
})
export class OperatorModule { }
