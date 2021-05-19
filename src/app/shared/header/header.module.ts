import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from '@app/shared/shared.module';




@NgModule({
  imports: [
    SidebarModule,
    SharedModule,

  ],
  declarations: [HeaderComponent],
  bootstrap: [HeaderComponent],
})
export class HeaderModule { }
