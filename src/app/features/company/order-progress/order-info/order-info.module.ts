import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CorporateService } from '@app/core/services/Corporate.service';
import { RegisterService } from '@app/core/services/Register.service';

import { OrderInfoRoutingModule } from './order-info-routing.module';
import { OrderInfoComponent } from './order-info.component';
import { NotConfromPhotoComponent } from './pop-up/not-confrom-photo/not-confrom-photo.component';
import { CompletePhotoComponent } from './pop-up/complete-photo/complete-photo.component';


@NgModule({
  declarations: [
    OrderInfoComponent,
    NotConfromPhotoComponent,
    CompletePhotoComponent,
  ],
  imports: [
    OrderInfoRoutingModule,
    SharedModule,
    RouterModule.forChild([{
      path: '', component: OrderInfoComponent
    }])
  ],
  providers: [
    CorporateService,
    RegisterService,
  ],
  entryComponents: [
    NotConfromPhotoComponent,
    CompletePhotoComponent,
  ]
})
export class OrderInfoModule { }
