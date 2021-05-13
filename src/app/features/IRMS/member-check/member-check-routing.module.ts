import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberCheckComponent } from './member-check.component';


const routes: Routes = [
  {
    path: '',
    component: MemberCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberCheckRoutingModule { }
