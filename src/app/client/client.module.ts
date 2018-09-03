import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientComponent } from './client.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MessagesComponent } from './messages/messages.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateBaseMessageComponent } from './update-base-message/update-base-message.component';

import { AuthService } from '../services/auth.service';
import { ServerService } from '../services/server.service';

import { HeaderModule } from '../header/header.module';
import { ActsModule } from '../acts/acts.module';
import { MessageModule } from '../message/message.module';

const clientRoutes: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        children: [
            {
                path: '',
                redirectTo: 'invoice',
                pathMatch: 'full'
            },
            {
                path: 'invoice',
                component: InvoiceComponent
            },
            {
                path: 'messages',
                component: MessagesComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(clientRoutes),
        CommonModule,
        NgbModule,
        FormsModule,
        HeaderModule,
        ActsModule,
        MessageModule
    ],
    exports: [
        RouterModule,
        InvoiceComponent,
        MessagesComponent
    ],
    declarations: [
        ClientComponent,
        InvoiceComponent,
        MessagesComponent,
        SettingsComponent,
        UpdateBaseMessageComponent
    ],
    providers: [
        AuthService,
        ServerService
    ],
})
export class ClientModule { }
