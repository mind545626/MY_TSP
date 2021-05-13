import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

import { MatTabsModule } from '@angular/material';
import { RecentContractComponent } from './tab/recent-contract/recent-contract.component';
import { ExpiredContractComponent } from './tab/expired-contract/expired-contract.component';
import { CorporateService } from '@app/core/services/Corporate.service';
import { RegisterService } from '@app/core/services/Register.service';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'

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
  providers: [
    CorporateService,
    RegisterService,
  ],
  bootstrap: [
    ContractComponent
  ],
})
export class ContractModule { }
