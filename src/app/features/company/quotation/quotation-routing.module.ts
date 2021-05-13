import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'quotation-info',
    loadChildren: () => import('./quotation-info/quotation-info.module').then(m => m.QuotationInfoModule)
  },
  {
    path: 'new-quotation',
    loadChildren: () => import('./new-quotation/new-quotation.module').then(m => m.NewQuotationModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class QuotationRoutingModule { }
