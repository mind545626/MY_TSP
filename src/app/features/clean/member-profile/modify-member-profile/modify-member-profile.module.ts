import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { ModifyMemberProfileRoutingModule } from './modify-member-profile-routing.module';
import { ModifyMemberProfileComponent } from './modify-member-profile.component';



@NgModule({
  declarations: [
    ModifyMemberProfileComponent
  ],
  imports: [
    ModifyMemberProfileRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: ModifyMemberProfileComponent
    }])
  ],
  providers: [CustomerService]
})
export class ModifyMemberProfileModule { }