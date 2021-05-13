import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyCarComponent } from './modify-car.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyCarComponent
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
export class ModifyCarRoutingModule { }