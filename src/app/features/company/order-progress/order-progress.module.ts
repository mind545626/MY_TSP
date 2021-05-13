import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { OrderProgressRoutingModule } from './order-progress-routing.module';
import { OrderProgressComponent } from './order-progress.component';

import { MatTabsModule } from '@angular/material';
import { RecentOrdersComponent } from './tab/recent-orders/recent-orders.component';
import { PendingComponent } from './tab/pending/pending.component';
import { ToboMatchComponent } from './tab/tobo-match/tobo-match.component';
import { ProcessedComponent } from './tab/processed/processed.component';
import { AbnormalComponent } from './tab/abnormal/abnormal.component';

import { CorporateService } from '@app/core/services/Corporate.service';
import { RegisterService } from '@app/core/services/Register.service';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  imports: [
    OrderProgressRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: OrderProgressComponent
    }]),
  ],
  declarations: [
    OrderProgressComponent,
    RecentOrdersComponent,
    PendingComponent,
    ToboMatchComponent,
    ProcessedComponent,
    AbnormalComponent
  ],
  providers: [
    CorporateService,
    RegisterService,
  ],
  bootstrap: [OrderProgressComponent],
})
export class OrderProgressModule { }

