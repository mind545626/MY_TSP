import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractInfoComponent } from './contract-info.component';


const routes: Routes = [
  {
    path: '',
    component: ContractInfoComponent
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
export class ContractInfoRoutingModule { }
