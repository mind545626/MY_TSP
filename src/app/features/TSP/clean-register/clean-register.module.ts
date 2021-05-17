import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CleanRegisterComponent } from './clean-register.component';
import { CleanRegisterRoutingModule } from './clean-register-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
  imports: [
    CleanRegisterRoutingModule,

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
  declarations: [CleanRegisterComponent],
  bootstrap: [CleanRegisterComponent],
})
export class CleanRegisterModule { }