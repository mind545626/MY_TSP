import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { ModifyQuotationComponent } from './modify-quotation.component';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';
import { RegisterService } from '@app/core/services/Register.service';
import { DialogModule } from 'primeng/dialog';
import * as $ from 'jquery';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

//載入畫面
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ModifyQuotationComponent,
  ],
  imports: [
    ProgressSpinnerModule,
    DialogModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MaterialModule,
    RouterModule.forChild([{
      path: '', component: ModifyQuotationComponent
    }])
  ],
  providers: [
    RegisterService,
  ]
})
export class ModifyQuotationModule { }
