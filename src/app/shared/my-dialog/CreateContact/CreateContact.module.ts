import { NgModule } from '@angular/core';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SharedModule } from '@app/shared/shared.module';

import { CreateContactComponent } from './CreateContact.component';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
//載入畫面
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    SharedModule
  ],
  providers: [
  ],
  declarations: [CreateContactComponent],
  bootstrap: [CreateContactComponent],
})
export class CreateContactModule { }



