import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderInfoComponent } from './order-info.component';

const routes: Routes = [

  {
    path: 'modify-order',
    loadChildren: () => import('./modify-order/modify-order.module').then(m => m.ModifyOrderModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class OrderInfoRoutingModule { }
