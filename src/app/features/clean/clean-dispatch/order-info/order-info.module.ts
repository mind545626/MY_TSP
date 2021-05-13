import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { OrderInfoRoutingModule } from './order-info-routing.module';
import { OrderInfoComponent } from './order-info.component';

@NgModule({
  declarations: [
    OrderInfoComponent,
  ],
  imports: [
    OrderInfoRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: OrderInfoComponent
    }])
  ],
  providers: [CustomerService]
})
export class OrderInfoModule { }