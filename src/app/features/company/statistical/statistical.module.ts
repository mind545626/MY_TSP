import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalComponent } from './statistical.component';

import { MatTabsModule } from '@angular/material';
import { AllContractComponent } from './tab/all-contract/all-contract.component';
import { AllOrdersComponent } from './tab/all-orders/all-orders.component';
import { AllQuotationComponent } from './tab/all-quotation/all-quotation.component';


@NgModule({
  imports: [
    StatisticalRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: StatisticalComponent
    }]),
  ],
  declarations: [
    StatisticalComponent,
    AllContractComponent,
    AllOrdersComponent,
    AllQuotationComponent,
  ],
  bootstrap: [
    StatisticalComponent
  ],
})
export class StatisticalModule { }
