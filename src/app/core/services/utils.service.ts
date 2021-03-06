import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
export const TOKEN = 'access_token';
@Injectable()
export class UtilsService {
  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isTokenExpired(token: string = TOKEN): boolean {
    let jwtStr = this.getToken(token);
    if (jwtStr) {
      return this.jwtHelper.isTokenExpired(jwtStr);  // token expired?
    } else {
      return true;        // no token
    }
  }

  writeToken(value: string, token: string = TOKEN) {
    localStorage.setItem(token, value);
  }

  getToken(token: string = TOKEN) {
    return localStorage.getItem(token);
  }

  removeToken(token: string = TOKEN) {
    if (this.getToken(token)) {
      localStorage.removeItem(token);
    }
  }
}



// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UtilsService {

//   constructor() { }
// }



