import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalComponent } from './statistical.component';

import { MatTabsModule } from '@angular/material';
import { AllDispatchComponent } from './tab/all-dispatch/all-dispatch.component';
import { AllContractComponent } from './tab/all-contract/all-contract.component';


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
    AllDispatchComponent,
    AllContractComponent
  ],
  bootstrap: [
    StatisticalComponent
  ],
})
export class StatisticalModule { }