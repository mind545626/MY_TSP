import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { ContractInfoRoutingModule } from './contract-info-routing.module';
import { ContractInfoComponent } from './contract-info.component';


@NgModule({
  declarations: [
    ContractInfoComponent
  ],
  imports: [
    ContractInfoRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: ContractInfoComponent
    }])
  ],
  providers: [CustomerService]
})
export class ContractInfoModule { }
