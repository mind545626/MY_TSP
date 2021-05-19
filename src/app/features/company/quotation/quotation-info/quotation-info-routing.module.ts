import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'modify-quotation',
    loadChildren: () => import('./modify-quotation/modify-quotation.module').then(m => m.ModifyQuotationModule)
  },
];
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class QuotationInfoRoutingModule { }
