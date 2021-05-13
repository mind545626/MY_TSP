import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { ModifyOrderRoutingModule } from './modify-order-routing.module';
import { ModifyOrderComponent } from './modify-order.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

import { RegisterService } from '@app/core/services/Register.service';

@NgModule({
  declarations: [
    ModifyOrderComponent,
  ],
  imports: [
    ModifyOrderRoutingModule,
    SharedModule,
    MessagesModule,
    MessageModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MaterialModule,
    RouterModule.forChild([{
      path: '', component: ModifyOrderComponent
    }])
  ],
  providers: [
    RegisterService,
  ]
})
export class ModifyOrderModule { }

