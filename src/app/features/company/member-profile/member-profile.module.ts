import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '@app/core/services/Login.service';
import { RegisterService } from '@app/core/services/Register.service';
import { MessageService } from '@app/core/services/message.service';

import { SharedModule } from '@app/shared/shared.module';

import { MemberProfileRoutingModule } from './member-profile-routing.module';
import { MemberProfileComponent } from './member-profile.component';



@NgModule({
  imports: [
    MemberProfileRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: MemberProfileComponent
    }]),
  ],
  declarations: [
    MemberProfileComponent,
  ],
  providers: [
    RegisterService,
    LoginService,
    MessageService
  ],
  bootstrap: [
    MemberProfileComponent
  ],
})
export class MemberProfileModule { }
