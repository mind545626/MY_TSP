import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { MemberProfileRoutingModule } from './member-profile-routing.module';
import { MemberProfileComponent } from './member-profile.component';


@NgModule({
  imports: [
    MemberProfileRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component:MemberProfileComponent
    }]),
  ],
  declarations: [
    MemberProfileComponent,
  ],
  bootstrap: [
    MemberProfileComponent
  ],
})
export class MemberProfileModule { }