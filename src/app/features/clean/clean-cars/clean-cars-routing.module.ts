import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cars-info',
    loadChildren: () => import('./cars-info/cars-info.module').then(m => m.CarsInfoModule)
  },
  {
    path: 'modify-car',
    loadChildren: () => import('./modify-car/modify-car.module').then(m => m.ModifyCarModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CleanCarsRoutingModule { }
