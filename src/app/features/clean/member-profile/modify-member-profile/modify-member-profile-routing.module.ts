import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyMemberProfileComponent } from './modify-member-profile.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyMemberProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyMemberProfileRoutingModule { }
