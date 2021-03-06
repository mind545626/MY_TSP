import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MemberCheckComponent } from './member-check.component';
import { MemberCheckRoutingModule } from './member-check-routing.module';



@NgModule({
  imports: [
    MemberCheckRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MemberCheckComponent],
  bootstrap: [MemberCheckComponent],
})

export class MemberCheckModule { }








