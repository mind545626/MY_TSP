import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModifyProcessingRegisterComponent } from './modify-processing-register.component';
import { ModifyProcessingRegisterRoutingModule } from './modify-processing-register-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
  imports: [
    ModifyProcessingRegisterRoutingModule,

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
  declarations: [ModifyProcessingRegisterComponent],
  bootstrap: [ModifyProcessingRegisterComponent],
})

export class ModifyProcessingRegisterModule { }

