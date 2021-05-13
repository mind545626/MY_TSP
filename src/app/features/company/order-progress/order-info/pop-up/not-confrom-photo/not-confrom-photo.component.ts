import { Component, OnInit } from '@angular/core';

// -------------載用彈窗-------------
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
// ---------------------------------

@Component({
  selector: 'app-not-confrom-photo',
  templateUrl: './not-confrom-photo.component.html',
  styleUrls: ['./not-confrom-photo.component.scss']
})
export class NotConfromPhotoComponent implements OnInit {

  constructor(
    public refNotConfromPhoto: DynamicDialogRef,
    public configNotConfromPhoto: DynamicDialogConfig,
  ) { }

  Paths = this.configNotConfromPhoto.data
  downloadUrl: string;

  ngOnInit() {
    this.getUrl()
    console.log(this.configNotConfromPhoto)
    console.log(this.refNotConfromPhoto)
  }


  getUrl() {
    if (window.location.href.indexOf("220.134.112.17") != -1) {   //外網
      this.downloadUrl = "http://220.134.112.174:8011"
    } else {   //內網
      this.downloadUrl = "http://192.168.89.17:8011"
    }
    //console.info(' url ' , this.Url+this.router.url);
    return this.downloadUrl;
  }

}
