import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewQuotationComponent } from './new-quotation.component';


const routes: Routes = [
  {
    path: '',
    component: NewQuotationComponent
  }
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
export class NewQuotationRoutingModule { }
