import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


// ------------------載入伺服器------------------
import { RegisterService } from '@app/core/services/Register.service';
// ---------------------------------------------

// 密碼符合驗證
import { NgxEqualstoModule } from 'ngx-equalsto';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  imports: [
    NgxEqualstoModule,
    RegisterRoutingModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  providers: [
    RegisterService
  ],
  declarations: [RegisterComponent],
  bootstrap: [RegisterComponent],
})
export class RegisterModule { }



