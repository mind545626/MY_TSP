import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginModule } from './features/IRMS/login/login.module';

import { PageNotFoundComponent } from './features/IRMS/page-not-found/page-not-found.component';
import { IndexComponent } from './features/IRMS/index/index.component';
import { RegisterComponent } from './features/IRMS/register/register.component';
import { LoginComponent } from './features/IRMS/login/login.component';
import { MemberCheckComponent } from './features/IRMS/member-check/member-check.component';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { CleanRegisterComponent } from './features/IRMS/clean-register/clean-register.component';
import { ProcessingRegisterComponent } from './features/IRMS/processing-register/processing-register.component';

import { ModifyRegisterComponent } from './features/IRMS/modify/modify-register/modify-register.component';
import { ModifyProcessingRegisterComponent } from './features/IRMS/modify/modify-processing-register/modify-processing-register.component';
import { ModifyCleanRegisterComponent } from './features/IRMS/modify/modify-clean-register/modify-clean-register.component';
import { ModifyPasswordCheckComponent } from './features/IRMS/modify/modify-password-check/modify-password-check.component';
import { AuthGuard } from './auth/auth.guard';
import { CorporateGuard } from './auth/corporate.guard';
import { WasteDealGuard } from './auth/waste-deal.guard';
import { WasteMoveGuard } from './auth/waste-move.guard';


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
    path: 'clean-register',
    component: CleanRegisterComponent,
    data: { title: 'clean-register' }
  },
  {
    path: 'processing-register',
    component: ProcessingRegisterComponent,
    data: { title: 'processing-register' }
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

  {
    path: 'modify-clean-register',
    component: ModifyCleanRegisterComponent,
    data: { title: 'modify-clean-register' }
  },
  {
    path: 'modify-processing-register',
    component: ModifyProcessingRegisterComponent,
    data: { title: 'modify-processing-register' }
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
        // 企業客戶
        // path: 'company/',
        // 取得ID
        // path: 'company/:UserId',
        path: 'company',
        canActivate: [CorporateGuard],
        loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule),
        data: { title: 'Corporate' },
      },
      {
        // 清除業者
        path: 'clean',
        canActivate: [WasteMoveGuard],
        loadChildren: () => import('./features/clean/clean.module').then(m => m.CleanModule),
        data: { title: 'WasteMove' },
      },
      {
        // 處理業者
        path: 'refuse-processing',
        canActivate: [WasteDealGuard],
        loadChildren: () => import('./features/refuse-processing/refuse-processing.module').then(m => m.RefuseProcessingModule),
        data: { title: 'WasteDeal' },
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];


@NgModule({
  // imports: [
  //   RouterModule.forRoot(routes, { enableTracing: true })
  // ],
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
