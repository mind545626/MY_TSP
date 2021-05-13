import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginService } from '@app/core/services/Login.service';
import { RegisterService } from '@app/core/services/Register.service';
import { MessageService } from '@app/core/services/message.service';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { ModifyMemberProfileRoutingModule } from './modify-member-profile-routing.module';
import { ModifyMemberProfileComponent } from './modify-member-profile.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

// 密碼符合驗證
import { NgxEqualstoModule } from 'ngx-equalsto';


@NgModule({
  declarations: [
    ModifyMemberProfileComponent
  ],
  imports: [
    NgxEqualstoModule,
    ModifyMemberProfileRoutingModule,
    SharedModule,
    ProgressSpinnerModule,
    DialogModule,
    RouterModule.forChild([{
      path: '', component: ModifyMemberProfileComponent
    }])
  ],
  // providers: [CustomerService],
  providers: [
    RegisterService,
    LoginService,
    MessageService,
  ],
})
export class ModifyMemberProfileModule { }
