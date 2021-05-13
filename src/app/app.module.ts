import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from "@angular/material/form-field";
import { MyModalComponent } from './shared/my-modal/my-modal.component';

import { IndexModule } from './features/IRMS/index/index.module';
import { LoginModule } from './features/IRMS/login/login.module';
import { RegisterModule } from './features/IRMS/register/register.module';
import { CleanRegisterModule } from './features/IRMS/clean-register/clean-register.module';
import { ProcessingRegisterModule } from './features/IRMS/processing-register/processing-register.module';
import { PageNotFoundModule } from './features/IRMS/page-not-found/page-not-found.module';
import { MemberCheckModule } from './features/IRMS/member-check/member-check.module';

import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { MainLayoutModule } from './features/main-layout/main-layout.module';

// 20201125新增
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModifyRegisterModule } from './features/IRMS/modify/modify-register/modify-register.module';
import { ModifyCleanRegisterModule } from './features/IRMS/modify/modify-clean-register/modify-clean-register.module';
import { ModifyProcessingRegisterModule } from './features/IRMS/modify/modify-processing-register/modify-processing-register.module';

// -------------API伺服器頁面-------------

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// ---------------------------------

//----------------彈窗聯絡我們--------------
import { CreateContactComponent } from '@app/shared/my-dialog/CreateContact/CreateContact.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
//-----------------------------------------

//----------------紀錄登入資訊--------------
import { UserDataService } from '@app/core/services/UserData.service';
import { UtilsService } from './core/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ModifyPasswordCheckModule } from './features/IRMS/modify/modify-password-check/modify-password-check.module';
//-----------------------------------------

@NgModule({
  imports: [
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    SidebarModule,

    IndexModule,
    LoginModule,
    RegisterModule,
    ModifyPasswordCheckModule,
    ModifyRegisterModule,
    CleanRegisterModule,
    ModifyCleanRegisterModule,
    ProcessingRegisterModule,
    ModifyProcessingRegisterModule,
    PageNotFoundModule,
    MemberCheckModule,

    // primebg搭載的彈出小視窗
    DialogModule,
    DynamicDialogModule,
    //----------------------

    MainLayoutModule,

    RouterModule,
    // -------------API伺服器頁面-------------
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        //whitelistDomains重命名為allowedDomain
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: []
      }
    })
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
    // ---------------------------------
  ],
  declarations: [
    AppComponent,
    // 首頁載入
    HeaderComponent,
    FooterComponent,
    MyModalComponent,
    CreateContactComponent,
  ],
  providers: [
    UserDataService,
    UtilsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // -------------聯絡我們-------------
    CreateContactComponent,
    // ---------------------------------
  ]
})
export class AppModule { }