import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrderComponent } from './new-order.component';


const routes: Routes = [
  {
    path: '',
    component: NewOrderComponent
  }
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
export class NewOrderRoutingModule { }
