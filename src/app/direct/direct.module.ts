import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../services/auth.service';
import { DirectService } from '../services/direct.service';

import { HeaderModule } from '../header/header.module';
import { ClientModule } from '../client/client.module';

import { DirectComponent } from './direct.component';

const directRoutes: Routes = [
    {
        path: 'direct/:id',
        component: DirectComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(directRoutes),
        CommonModule,
        NgbModule,
        FormsModule,
        HeaderModule,
        ClientModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        DirectComponent
    ],
    providers: [
        AuthService,
        DirectService
    ],
})
export class DirectModule { }
