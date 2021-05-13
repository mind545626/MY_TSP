import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';

import { MatTabsModule } from '@angular/material';
import { RecentQuotationsComponent } from './tab/recent-quotations/recent-quotations.component';
import { CorporateService } from '@app/core/services/Corporate.service';

import { RegisterService } from '@app/core/services/Register.service';

@NgModule({
  imports: [
    QuotationRoutingModule,
    SharedModule,
    MatTabsModule,
    RouterModule.forChild([{
      path: '', component: QuotationComponent
    }]),
  ],
  declarations: [
    QuotationComponent,
    RecentQuotationsComponent,
  ],
  providers: [
    CorporateService,
    RegisterService,
  ],
  bootstrap: [
    QuotationComponent
  ],
})
export class QuotationModule { }
