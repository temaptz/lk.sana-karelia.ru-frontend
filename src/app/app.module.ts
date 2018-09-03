import { NgModule, LOCALE_ID } from '@angular/core';
// import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapGrowlModule } from 'ngx-bootstrap-growl';
// import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { ClientModule } from './client/client.module';
import { OperatorModule } from './operator/operator.module';
import { ActsModule } from './acts/acts.module';
import { LoadingModule } from './loading/loading.module';
import { AlertModule } from './alerts/alert.module';
import { MessageModule } from './message/message.module';
import { FooterModule } from './footer/footer.module';
import { DirectModule } from './direct/direct.module';
import { AdminModule } from './admin/admin.module';
import { CallModule } from './call/call.module';

import { ConfigService } from './services/config.service';
import { AuthService } from './services';
import { LoadingService } from './services/loading.service';
import { UsersService } from './services/users.service';
import { MessagesService } from './services/messages.service';

import { appRouting } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        appRouting,
        NgbModule.forRoot(),
        BootstrapGrowlModule,
        Angular2FontawesomeModule,
        LoginModule,
        ClientModule,
        OperatorModule,
        ActsModule,
        LoadingModule,
        AlertModule,
        MessageModule,
        FooterModule,
        DirectModule,
        AdminModule,
        CallModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        ConfigService,
        AuthService,
        LoadingService,
        UsersService,
        MessagesService
    ],
    bootstrap: [
        AppComponent
    ],
    exports: []
})
export class AppModule {
    // constructor(public appRef: ApplicationRef) {
    // }
    //
    // hmrOnInit(store) {
    //     console.log('HMR store', store);
    // }
    //
    // hmrOnDestroy(store) {
    //     let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    //     // recreate elements
    //     store.disposeOldHosts = createNewHosts(cmpLocation);
    //     // remove styles
    //     removeNgStyles();
    // }
    //
    // hmrAfterDestroy(store) {
    //     // display new elements
    //     store.disposeOldHosts();
    //     delete store.disposeOldHosts;
    // }
}
