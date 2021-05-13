import { Component, OnInit, ViewChild } from '@angular/core';

import { Customer, Cars } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit {

  querydate: any[];

  //datepicker
  date1: Date;
  date2: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  invalidDates: Array<Date>

  //table用變數
  cars: Cars[]
  customers: Customer[];
  cols: any[];

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) table: Table;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }
  ngOnInit() {

    this.customerService.getCars().then(customers => this.cars = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'CarNumber', header: '車號', width: '180px' },
      { field: 'ExamineFrequency', header: '驗車週期', width: '150px' },
      { field: 'ExamineDate', header: '上次驗車日期', width: '180px' },
      { field: 'FireInspection', header: '消防器材週期', width: '150px' },
      { field: 'FireInspectionDate', header: '消防器材更新日期', width: '180px' },
      // { field: 'ContractID', header: '提交合約編號', width: '180px' },
      // { field: 'SubmitProgress', header: '提交狀態', width: '180px' },
      // { field: 'ContractDateStart', header: '提交合約生效日期', width: '180px' },
      // { field: 'ContractDateEnd', header: '提交合約結束日期', width: '180px' },
      // { field: 'Edit', header: '功能', width: '180px' }
    ];
  }

}
