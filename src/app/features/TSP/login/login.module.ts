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

