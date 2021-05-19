import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { OrderProgressRoutingModule } from './order-progress-routing.module';
import { OrderProgressComponent } from './order-progress.component';

import { MatTabsModule } from '@angular/material';
import { RecentOrdersComponent } from './tab/recent-orders/recent-orders.component';

import { SellerService } from '@app/core/services/Seller.service';
import { RegisterService } from '@app/core/services/Register.service';



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
  ],
  providers: [
    SellerService,
    RegisterService,
  ],
  bootstrap: [OrderProgressComponent],
})
export class OrderProgressModule { }

