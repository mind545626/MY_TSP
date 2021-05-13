import { Key, Login, LoginData, ResponseLoginData } from '@app/core/models/user';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, CanLoad } from '@angular/router';
import { LoginService } from '@app/core/services/Login.service';
import { UserDataService } from '@app/core/services/UserData.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  // CanLoad
  // loginStatus$: Observable<boolean>;
  // currentUser$: ResponseLoginData;
  // currentUser: LoginData;

  Active: boolean


  constructor(
    // private permissions: Permissions,
    // private currentUser: UserToken,
    private LoginService: LoginService,
    private UserDataService: UserDataService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    // route: RouterStateSnapshot
    // route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean // 回傳true|false
  // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    // console.log('AuthGuard#canActivate 已觸發');

    this.Active = this.UserDataService.UserData.body.Active
    // let url: string = state.url;
    // let page: string = route.data.pageTitle;
    // return this.checkLogin(url, page);
    // 如果是Login狀態，就回傳ture
    // this.LoginService.getUserLogin(LoginData).subscribe((data: ResponseLoginData) => {
    //   if (data.isSuccess = true) {
    //     console.log(this.LoginService.getUserLogin(LoginData), '登入成功');
    //     return true
    //     // this.permissions.canActivate(this.currentUser, route.params.id);
    //   }
    // })

    // let data: ResponseLoginData
    // 如果是Login狀態，就回傳ture
    if (this.Active = true) {
      console.log(this.Active, '登入成功');
      return true
    }
    // 若不是Login狀態
    // this.router.navigate(['/login']);
    // redirect回login
    this.router.navigate(['/**']);
    return false;


  }

  // 強制通過
  // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // console.log('AuthGuard#canActivate 已觸發');
  // return true;

  // 強制失敗
  // state: RouterStateSnapshot): boolean {
  // console.log('AuthGuard#canActivate 被觸發了, 你沒有授權！將跳轉回前台頁面');
  // // 5秒後跳轉至登入頁面
  // setTimeout(() => {
  //   this.router.navigateByUrl('/login');
  // }, 5000);
  // return false;


  // canLoad(route: Route): Observable<boolean> {
  //   let url = `/${route.path}`;
  //   let page: string = route.data.pageTitle;
  //   // let url = route.data.pageTitle;
  //   return this.checkLogin(url, page);
  // }


  // checkLogin(url: string, page: string): Observable<boolean> {
  //   return this.loginStatus$.pipe(
  //     tap(async (status) => {

  //       if (!status) {
  //         console.log('請重新登入')
  //         this.router.navigate(['/login']);
  //       }

  //       this.currentUser.UserId = await this.currentUser$.body.UserId
  //       const Active = this.currentUser.Active;
  //       const parts = url.split('/');
  //       if (Active && Active.valueOf() === false) {
  //         console.log('請求失敗');
  //         this.router.navigate(['/administrator/notice']);
  //         return false;

  //       } else {
  //         console.log('請求成功');
  //         return true;
  //       }
  //     }),
  //     take(1),
  //   );
  // }
}

