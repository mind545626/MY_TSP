import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModifyCleanRegisterComponent } from './modify-clean-register.component';
import { ModifyCleanRegisterRoutingModule } from './modify-clean-register-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
  imports: [
    ModifyCleanRegisterRoutingModule,

    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  declarations: [ModifyCleanRegisterComponent],
  bootstrap: [ModifyCleanRegisterComponent],
})

export class ModifyCleanRegisterModule { }