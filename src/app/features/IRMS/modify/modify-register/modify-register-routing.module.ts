import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyRegisterComponent } from './modify-register.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyRegisterRoutingModule { }
