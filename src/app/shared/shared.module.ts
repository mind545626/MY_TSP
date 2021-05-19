import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
// import { SmartadminLayoutModule } from "./layout";
import { HttpClientModule } from '@angular/common/http';
//primeng
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { DialogModule } from 'primeng/dialog';


import { MatTabsModule, MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { NgxEqualstoModule } from "ngx-equalsto";
import { ProgressSpinnerModule } from "primeng/progressspinner";



@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    RouterModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    TieredMenuModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    CalendarModule,
    BreadcrumbModule,
    SliderModule,
    CheckboxModule,
    InputTextareaModule,

    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxEqualstoModule,
    ProgressSpinnerModule,
    // StatsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TieredMenuModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    CalendarModule,
    BreadcrumbModule,
    SliderModule,
    CheckboxModule,
    InputTextareaModule,


    // ReactiveFormsModule包含FormBuilder
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxEqualstoModule,
    ProgressSpinnerModule,
    // StatsModule,

  ]
})
export class SharedModule { }
