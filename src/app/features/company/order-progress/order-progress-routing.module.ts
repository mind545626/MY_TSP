import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'order-info',
    loadChildren: () => import('./order-info/order-info.module').then(m => m.OrderInfoModule)
  },
  {
    path: 'new-order',
    loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderProgressRoutingModule { }
