import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from '@app/shared/shared.module';
// import { TieredMenuModule } from 'primeng/tieredmenu';
// import { ButtonModule } from 'primeng/button';



@NgModule({
  imports: [
    SidebarModule,
    SharedModule,
    // ButtonModule,
    // TieredMenuModule,
  ],
  declarations: [HeaderComponent],
  bootstrap: [HeaderComponent],
})
export class HeaderModule { }
