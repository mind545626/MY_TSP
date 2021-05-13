import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { CleanDispatchRoutingModule } from './clean-dispatch-routing.module';
import { CleanDispatchComponent } from './clean-dispatch.component';

import { MatTabsModule } from '@angular/material';
import { RecentDispatchComponent } from './tab/recent-dispatch/recent-dispatch.component';
import { ToboDispatchComponent } from './tab/tobo-dispatch/tobo-dispatch.component';
import { FulfillComponent } from './tab/fulfill/fulfill.component';
import { AbnormalComponent } from './tab/abnormal/abnormal.component';

@NgModule({
  imports: [
    CleanDispatchRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: CleanDispatchComponent
    }]),
  ],
  declarations: [
    CleanDispatchComponent,
    RecentDispatchComponent,
    ToboDispatchComponent,
    FulfillComponent,
    AbnormalComponent,
  ],
  bootstrap: [
    CleanDispatchComponent
  ],
})
export class CleanDispatchModule { }
