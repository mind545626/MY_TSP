import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CustomerService } from '@app/services/customerservice';

import { QuotationInfoRoutingModule } from './quotation-info-routing.module';
import { QuotationInfoComponent } from './quotation-info.component';
// import { MessageModule, MessagesModule } from 'primeng';

import { MessageService } from '@app/core/services/message.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ModifyQuotationComponent } from './modify-quotation/modify-quotation.component';

@NgModule({
  declarations: [
    QuotationInfoComponent,
  ],
  imports: [
    QuotationInfoRoutingModule,
    SharedModule,
    ProgressSpinnerModule,
    RouterModule.forChild([{
      path: '', component: QuotationInfoComponent
    }])
  ],
  providers: [
    CustomerService,
    MessageService,
  ],
  exports: [
  ]
})
export class QuotationInfoModule { }



