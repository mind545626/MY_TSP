import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyProcessingRegisterComponent } from './modify-processing-register.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyProcessingRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyProcessingRegisterRoutingModule { }