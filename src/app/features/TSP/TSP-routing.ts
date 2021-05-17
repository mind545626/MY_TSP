// import { NgModule } from '@angular/core';
// import {ModuleWithProviders} from "@angular/core"
import { Routes, RouterModule } from '@angular/router';


export const routes:Routes = [

  // {
  //   path: 'index',
  //   loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
  //   data: {pageTitle: 'index'}
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  //   data: {pageTitle: 'login'}
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  //   data: {pageTitle: 'register'}
  // },
  // {
  //   path: 'page-not-found',
  //   loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  //   data: {pageTitle: 'page-not-found'}
  // },
];


export const routing = RouterModule.forChild(routes)