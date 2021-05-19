import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, CanLoad } from '@angular/router';
import { ResponseLoginData } from '@app/core/models/user';
import { UserDataService } from '@app/core/services/UserData.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {

  Active: boolean;
  Seller: string;
  UserData: ResponseLoginData;

  constructor(
    private UserDataService: UserDataService,
    private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    this.Active = this.UserData.body.Active
    this.Seller = this.UserData.body.SellerType

    if (this.Active === true && this.Seller === 'Seller') {
      console.log(this.Seller + this.Active, '賣家會員登入成功');
      return true
    }

    this.router.navigate(['/**']);
    return false;

  }
}
