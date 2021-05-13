import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';

import { CleanCarsRoutingModule } from './clean-cars-routing.module';
import { CleanCarsComponent } from './clean-cars.component';

import { MatTabsModule } from '@angular/material';
import { AllCarsComponent } from './tab/all-cars/all-cars.component';

@NgModule({
  imports: [
    CleanCarsRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: CleanCarsComponent
    }]),
  ],
  declarations: [
    CleanCarsComponent,
    AllCarsComponent,
  ],
  bootstrap: [
    CleanCarsComponent
  ],
})
export class CleanCarsModule { }