import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  // 首頁與訂單
  {
    path: 'order-progress',
    loadChildren: () => import('./order-progress/order-progress.module').then(m => m.OrderProgressModule),
    data: { pageTitle: 'order-progress' }
  },
  // 估價單
  {
    path: 'quotation',
    loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationModule),
    data: { pageTitle: 'quotation' }
  },
  // 統計頁面
  {
    path: 'statistical',
    loadChildren: () => import('./statistical/statistical.module').then(m => m.StatisticalModule),
    data: { pageTitle: 'statistical' }
  },
  // 合約管理
  {
    path: 'contract',
    loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule),
    data: { pageTitle: 'contract' }
  },
  // 會員資料
  {
    path: 'member-profile',
    loadChildren: () => import('./member-profile/member-profile.module').then(m => m.MemberProfileModule),
    data: { pageTitle: 'member-profile' }
  },
];


export const routing = RouterModule.forChild(routes)
