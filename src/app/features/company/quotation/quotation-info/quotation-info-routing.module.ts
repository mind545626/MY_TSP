import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationInfoComponent } from './quotation-info.component';
// import { ModifyQuotationComponent } from './modify-quotation/modify-quotation.component';

const routes: Routes = [
  {
    path: 'modify-quotation',
    loadChildren: () => import('./modify-quotation/modify-quotation.module').then(m => m.ModifyQuotationModule)
  },
  // {
  //   path: '',
  //   component: QuotationInfoComponent
  // }
];
@NgModule({
  declarations: [
    // QuotationInfoComponent,
    // ModifyQuotationComponent,
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    // ModifyQuotationComponent,
    RouterModule
  ],
  providers: []
})
export class QuotationInfoRoutingModule { }
