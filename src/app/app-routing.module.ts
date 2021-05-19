import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginModule } from './features/TSP/login/login.module';

import { PageNotFoundComponent } from './features/TSP/page-not-found/page-not-found.component';
import { IndexComponent } from './features/TSP/index/index.component';
import { RegisterComponent } from './features/TSP/register/register.component';
import { LoginComponent } from './features/TSP/login/login.component';
import { MemberCheckComponent } from './features/TSP/member-check/member-check.component';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';

import { ModifyRegisterComponent } from './features/TSP/modify/modify-register/modify-register.component';
import { ModifyPasswordCheckComponent } from './features/TSP/modify/modify-password-check/modify-password-check.component';
import { AuthGuard } from './auth/auth.guard';
import { SellerGuard } from './auth/Seller.guard';
import { BuyerGuard } from './auth/buyer.guard';
import { CourierGuard } from './auth/courier.guard';


// -------------API伺服器頁面-------------

// ---------------------------------



const routes: Routes = [

  {
    path: '',
    // redirectTo: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
    data: { title: 'index' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'register' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'member-check',
    component: MemberCheckComponent,
    data: { title: 'member-check' }
  },

  // 編輯暫時事業會員
  {
    path: 'modify-register',
    component: ModifyRegisterComponent,
    data: { title: 'modify-register' }
  },
  // 編輯忘記密碼
  {
    path: 'modify-password-check',
    component: ModifyPasswordCheckComponent,
    data: { title: 'modify-register' }
  },



  // -------------API伺服器頁面-------------

  // ---------------------------------
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    data: { pageTitle: "Home" },
    children: [
      {
        // 賣家會員
        // path: 'company/',
        // Get ID
        // path: 'company/:UserId',
        path: 'company',
        canActivate: [SellerGuard],
        loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule),
        data: { title: 'Seller' },
      },
      {
        // 快遞會員
        // path: 'clean',
        // canActivate: [CourierGuard],
        // loadChildren: () => import('./features/clean/clean.module').then(m => m.CleanModule),
        // data: { title: 'Courier' },
      },
      {
        // 買家會員
        // path: 'refuse-processing',
        // canActivate: [BuyerGuard],
        // loadChildren: () => import('./features/refuse-processing/refuse-processing.module').then(m => m.RefuseProcessingModule),
        // data: { title: 'Buyer' },
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
