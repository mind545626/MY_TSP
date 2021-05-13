import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyPasswordCheckComponent } from './modify-password-check.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyPasswordCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyPasswordCheckRoutingModule { }
