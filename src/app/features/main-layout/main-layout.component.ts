import { Component, OnInit } from '@angular/core';
import { ResponseLoginData } from '@app/core/models/user';
import { UserDataService } from '@app/core/services/UserData.service.ts';
// import { MessageService } from 'primeng/api';

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ['./main-layout.component.scss'],
  // providers:[MessageService]
})

export class MainLayoutComponent implements OnInit {

  UserData: ResponseLoginData;

  constructor(
    private UserDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    // this.UserData = this.UserDataService.UserData
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
  }

}
