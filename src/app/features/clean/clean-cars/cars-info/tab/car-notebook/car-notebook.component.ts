import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Customer, Note } from '@app/services/customer';
import { CustomerService } from '@app/services/customerservice';

import { FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-car-notebook',
  templateUrl: './car-notebook.component.html',
  styleUrls: ['./car-notebook.component.scss']
})
export class CarNotebookComponent implements OnInit {

  //table用變數
  note: Note[]
  customers: Customer[];
  cols: any[];
  selectedOrders: Customer;

  //驗證用變數
  submitted = false;
  valid = true;

  @ViewChild('dt', { static: false }) content: ElementRef; table: Table;


  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }
  ngOnInit() {

    this.customerService.getNote().then(customers => this.note = customers)

    this.cols = [
      { field: 'no', header: '項次', width: '75px' },
      { field: 'NoteDate', header: '紀錄時間', width: '180px' },
      { field: 'NoteTitle', header: '標題', width: '180px' },
      { field: 'Notecontent', header: '內容', width: '300px' },
      { field: 'Edit', header: '功能', width: '180px' }
    ];
  }

  editProduct(){

  }

  deleteProduct(){

  }


}
