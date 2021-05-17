import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyPasswordCheckComponent } from './modify-password-check.component';
import { MessageService } from 'primeng';



@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
  ],
  declarations: [ModifyPasswordCheckComponent],
  bootstrap: [ModifyPasswordCheckComponent],
  providers: [
    MessageService,
  ],
})
export class ModifyPasswordCheckModule { }
