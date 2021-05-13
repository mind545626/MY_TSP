import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifyQuotationComponent } from './modify-quotation.component';


const routes: Routes = [
//  {
//     path: '',
//     component: ModifyQuotationComponent
//   }
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
export class ModifyQuotationRoutingModule { }
