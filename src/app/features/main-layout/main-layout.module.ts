import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';

import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { NavbarComponent } from '@app/shared/navbar/navbar.component';


// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'


@NgModule({
  imports: [
    MainLayoutRoutingModule,
    SharedModule,
  ],
  declarations: [
    MainLayoutComponent,
    NavbarComponent
  ],
  bootstrap: [MainLayoutComponent],
})
export class MainLayoutModule { }

