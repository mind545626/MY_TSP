import { Component, OnInit } from '@angular/core';
// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------

@Component({
  selector: 'app-complete-photo',
  templateUrl: './complete-photo.component.html',
  styleUrls: ['./complete-photo.component.scss']
})
export class CompletePhotoComponent implements OnInit {


  constructor(
    public refCompletephoto: DynamicDialogRef,
    public configCompletephoto: DynamicDialogConfig,
  ) { }

  Paths = this.configCompletephoto.data
  downloadUrl: string;

  ngOnInit() {
    this.getUrl()
    console.log(this.configCompletephoto)
    console.log(this.refCompletephoto)
  }


  getUrl() {
    if (window.location.href.indexOf("220.134.112.17") != -1) {   //外網
      this.downloadUrl = "http://192.0.0.1:1000"
    } else {   //內網
      this.downloadUrl = "http://192.0.0.1:1000"
    }
    return this.downloadUrl;
  }
}
