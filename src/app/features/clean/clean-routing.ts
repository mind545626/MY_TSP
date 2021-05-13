import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // 首頁與派車單
  {
    path: 'clean-dispatch',
    loadChildren: () => import('./clean-dispatch/clean-dispatch.module').then(m => m.CleanDispatchModule),
    data: { pageTitle: 'clean-dispatch' }
  },
  // 車輛管理
  {
    path: 'clean-cars',
    loadChildren: () => import('./clean-cars/clean-cars.module').then(m => m.CleanCarsModule),
    data: { pageTitle: 'clean-cars' }
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