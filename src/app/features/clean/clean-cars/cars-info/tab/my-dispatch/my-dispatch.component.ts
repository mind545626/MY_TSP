import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Customer, Dispatch } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';

// declare var jsPDF: any;
// import * as jsPDF from 'jspdf';
// import * as autoTable from 'jspdf-autotable'
// import jsPDF from 'jspdf';
// import "jspdf/dist/polyfills.es.js";
// import 'jspdf-autotable';


@Component({
  selector: 'app-my-dispatch',
  templateUrl: './my-dispatch.component.html',
  styleUrls: ['./my-dispatch.component.scss']
})
export class MyDispatchComponent implements OnInit {



  dispatch: Dispatch[]
  customers: Customer[];
  cols: any[];

  @ViewChild('dt', { static: false }) content: ElementRef; table: Table;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }
  ngOnInit() {

    this.customerService.getDispatch().then(customers => this.dispatch = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'DispatchID', header: '派車單編號', width: '180px' },
      { field: 'DispatchDate', header: '執行任務日期', width: '180px' },
      { field: 'DispatchProgress', header: '執行狀態', width: '180px' },
      { field: 'DispatchFulfillDate', header: '完成任務日期', width: '180px' },
      // { field: 'CarNumber', header: '車號', width: '150px' },
      { field: 'PreDispatchPrice', header: '預估派車單總價', width: '150px' },
      { field: 'DispatchPrice', header: '實際派車單總價', width: '150px' },
      { field: 'Payment', header: '付款狀況', width: '180px' },
    ];
  }
}
