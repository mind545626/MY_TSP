import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsInfoComponent } from './cars-info.component';

const routes: Routes = [
  {
    path: '',
    component: CarsInfoComponent
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
export class CarsInfoRoutingModule { }