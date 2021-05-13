import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { ContractInfoRoutingModule } from './contract-info-routing.module';
import { ContractInfoComponent } from './contract-info.component';

import { MyCarsComponent } from './tab/my-cars/my-cars.component';


@NgModule({
  imports: [
    ContractInfoRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: ContractInfoComponent
    }])
  ],
  declarations: [
    ContractInfoComponent,
    MyCarsComponent
  ],
  providers: [CustomerService]
})
export class ContractInfoModule { }