import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';



// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  imports: [
    PageNotFoundRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PageNotFoundComponent],
  bootstrap: [PageNotFoundComponent],
})
export class PageNotFoundModule { }