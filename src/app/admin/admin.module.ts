import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderModule } from '../header/header.module';
import { SearchModule } from '../search/search.module';

import { AdminComponent } from './admin.component';
import { AdminUsersComponent } from './users/admin-users.component';
import { AdminCreateUserModalComponent } from './modal/create-user/create-user-modal.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes),
        CommonModule,
        NgbModule,
        FormsModule,
        HeaderModule,
        SearchModule
    ],
    declarations: [
        AdminComponent,
        AdminUsersComponent,
        AdminCreateUserModalComponent
    ],
    providers: [],
    entryComponents: [
        AdminCreateUserModalComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AdminModule { }
