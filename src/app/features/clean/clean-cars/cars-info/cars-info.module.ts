import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { CarsInfoRoutingModule } from './cars-info-routing.module';
import { CarsInfoComponent } from './cars-info.component';

import { MatTabsModule } from '@angular/material';

import { CarNotebookComponent } from './tab/car-notebook/car-notebook.component';
import { MyDispatchComponent } from './tab/my-dispatch/my-dispatch.component';


@NgModule({
  imports: [
    CarsInfoRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: CarsInfoComponent
    }]),
    // AgGridModule.withComponents([
    //   CarsInfoComponent
    // ]),
  ],
  declarations: [
    CarsInfoComponent,
    CarNotebookComponent,
    MyDispatchComponent,
  ],
  providers: [CustomerService],
  bootstrap: [
    CarsInfoComponent
  ],
})
export class CarsInfoModule { }