import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CleanRegisterComponent } from './clean-register.component';


const routes: Routes = [
  {
    path: '',
    component: CleanRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleanRegisterRoutingModule { }
