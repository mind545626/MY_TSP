import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ResponseLoginData } from '@app/core/models/user';
import { UserDataService } from '@app/core/services/UserData.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WasteDealGuard implements CanActivate {

  Active: boolean;
  WasteDeal: string;
  UserData: ResponseLoginData;

  constructor(
    private UserDataService: UserDataService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    this.Active = this.UserData.body.Active
    this.WasteDeal = this.UserData.body.CorporateType

    if (this.Active === true && this.WasteDeal === 'WasteDeal') {
      console.log(this.WasteDeal + this.Active, '處理夥伴登入成功');
      return true
    }

    this.router.navigate(['/**']);
    return false;
  }

}
