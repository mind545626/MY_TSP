import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyCleanRegisterComponent } from './modify-clean-register.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyCleanRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyCleanRegisterRoutingModule { }