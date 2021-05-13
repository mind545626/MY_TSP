import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'order-info',
    loadChildren: () => import('./order-info/order-info.module').then(m => m.OrderInfoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleanDispatchRoutingModule { }
