import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [NavbarComponent],
  bootstrap: [NavbarComponent],
})
export class NavbarModule { }
