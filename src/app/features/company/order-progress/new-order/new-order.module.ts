import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { NewOrderRoutingModule } from './new-order-routing.module';
import { NewOrderComponent } from './new-order.component';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';


@NgModule({
  declarations: [
    NewOrderComponent,
  ],
  imports: [
    NewOrderRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MaterialModule,
    RouterModule.forChild([{
      path: '', component: NewOrderComponent
    }])
  ],
  providers: []
})
export class NewOrderModule { }
