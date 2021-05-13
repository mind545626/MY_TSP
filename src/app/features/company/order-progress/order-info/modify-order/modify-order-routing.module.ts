import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyOrderComponent } from './modify-order.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: ModifyOrderComponent
  // }
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
export class ModifyOrderRoutingModule { }
