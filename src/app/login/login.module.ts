import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login.component';

import { AuthService } from '../services/auth.service';


const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes),
        NgbModule,
        FormsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService
    ],
})
export class LoginModule { }
