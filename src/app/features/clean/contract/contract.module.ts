import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

import { MatTabsModule } from '@angular/material';
import { RecentContractComponent } from './tab/recent-contract/recent-contract.component';
import { ExpiredContractComponent } from './tab/expired-contract/expired-contract.component';

@NgModule({
  imports: [
    ContractRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: ContractComponent
    }]),
  ],
  declarations: [
    ContractComponent,
    RecentContractComponent,
    ExpiredContractComponent,
  ],
  bootstrap: [
    ContractComponent
  ],
})
export class ContractModule { }