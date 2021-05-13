import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProcessingRegisterComponent } from './processing-register.component';
import { ProcessingRegisterRoutingModule } from './processing-register-routing.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
  imports: [
    ProcessingRegisterRoutingModule,

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
  declarations: [ProcessingRegisterComponent],
  bootstrap: [ProcessingRegisterComponent],
})
export class ProcessingRegisterModule { }
