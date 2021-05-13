import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { ModifyCarRoutingModule } from './modify-car-routing.module';
import { ModifyCarComponent } from './modify-car.component';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';


@NgModule({
  declarations: [
    ModifyCarComponent,
  ],
  imports: [
    ModifyCarRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MaterialModule,
    RouterModule.forChild([{
      path: '', component: ModifyCarComponent
    }])
  ],
  providers: []
})
export class ModifyCarModule { }