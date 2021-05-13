import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'modify-member-profile',
    loadChildren: () => import('./modify-member-profile/modify-member-profile.module').then(m => m.ModifyMemberProfileModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberProfileRoutingModule { }
