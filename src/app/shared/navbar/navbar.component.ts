import { Component, OnInit } from '@angular/core';
import { ResponseLoginData } from '@app/core/models/user';
import { UserDataService } from '@app/core/services/UserData.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  UserData: ResponseLoginData
  Corporate: boolean;
  WasteMove: boolean;
  WasteDeal: boolean;

  constructor(
    private UserDataService: UserDataService,
  ) { }

  ngOnInit() {
    this.Corporate = false
    this.WasteMove = false
    this.WasteDeal = false

    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    // this.UserData = this.UserDataService.UserData

    var CorporateType = this.UserData.body.CorporateType
    switch (CorporateType) {
      case 'Corporate': {
        this.Corporate = true
        break;
      }
      case 'WasteMove': {
        this.WasteMove = true
        break;
      }
      case 'WasteDeal': {
        this.WasteDeal = true
        break;
      }
      default: {
        this.Corporate = false
        this.WasteMove = false
        this.WasteDeal = false
        break;
      }
    }
  }

}
