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
  Seller: boolean;
  Courier: boolean;
  Buyer: boolean;

  constructor(
    private UserDataService: UserDataService,
  ) { }

  ngOnInit() {
    this.Seller = false
    this.Courier = false
    this.Buyer = false

    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    // this.UserData = this.UserDataService.UserData

    var SellerType = this.UserData.body.SellerType
    switch (SellerType) {
      case 'Seller': {
        this.Seller = true
        break;
      }
      case 'Courier': {
        this.Courier = true
        break;
      }
      case 'Buyer': {
        this.Buyer = true
        break;
      }
      default: {
        this.Seller = false
        this.Courier = false
        this.Buyer = false
        break;
      }
    }
  }

}
