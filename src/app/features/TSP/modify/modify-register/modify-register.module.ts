import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModifyRegisterComponent } from './modify-register.component';
import { ModifyRegisterRoutingModule } from './modify-register-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';


import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// ------------------載入伺服器------------------
import { RegisterService } from '@app/core/services/Register.service';
// ---------------------------------------------

//載入畫面
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// 密碼符合驗證
import { NgxEqualstoModule } from 'ngx-equalsto';


@NgModule({
  imports: [
    NgxEqualstoModule,
    ModifyRegisterRoutingModule,
    MessagesModule,
    MessageModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CalendarModule,
    ProgressSpinnerModule,
  ],
  providers: [
    RegisterService
  ],
  declarations: [ModifyRegisterComponent],
  bootstrap: [ModifyRegisterComponent],
})

export class ModifyRegisterModule { }





