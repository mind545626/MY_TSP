import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessingRegisterComponent } from './processing-register.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessingRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessingRegisterRoutingModule { }
