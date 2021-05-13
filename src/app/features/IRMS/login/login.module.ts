import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { LoginService } from '@app/core/services/Login.service';
import { MessageService } from '@app/core/services/message.service';
import { ForgetPasswordComponent } from './pop-up/forget-password/ForgetPassword.component';

// hCaptcha 添加
// import { NgHcaptchaModule } from 'ng-hcaptcha';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  imports: [
    LoginRoutingModule,

    SharedModule,
    MaterialModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,

    // hCaptcha 添加
    // NgHcaptchaModule.forRoot({
    //   siteKey: '2e07302e-19e0-46d1-9dda-10d67df662d3',
    //   languageCode: 'zh-TW' // optional, will default to browser language
    // }),
    // NgHcaptchaModule.forRoot()
  ],
  providers: [
    LoginService,
    MessageService,
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent
  ],
  entryComponents: [
    // 彈窗載用
    ForgetPasswordComponent,
  ],
  bootstrap: [LoginComponent],
})
export class LoginModule { }

