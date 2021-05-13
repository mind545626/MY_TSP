import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
// import { SmartadminLayoutModule } from "./layout";
import { HttpClientModule } from '@angular/common/http';

// import { I18nModule } from "./i18n/i18n.module";
// import { UserModule } from "./user/user.module";
// import { BootstrapModule } from "@app/shared/bootstrap.module";
// import { VoiceControlModule } from "./voice-control/voice-control.module";
// import { SmartadminWidgetsModule } from "./widgets/smartadmin-widgets.module";
// import { UtilsModule } from "./utils/utils.module";
// import { PipesModule } from "./pipes/pipes.module";
// import { ChatModule } from "./chat/chat.module";
// import { StatsModule } from "./stats/stats.module";
// import { InlineGraphsModule } from "./graphs/inline/inline-graphs.module";
// import { SmartadminFormsLiteModule } from "./forms/smartadmin-forms-lite.module";
// import { SmartProgressbarModule } from "./ui/smart-progressbar/smart-progressbar.module";
// import { CalendarComponentsModule } from "@app/shared/calendar/calendar-components.module";

// custom shared component
// import { DatepickerModule } from '@app/shared/datepicker/datepicker.module';
// import { MattableModule } from '@app/shared/mat-table/mattable.module';
// import { SelectFormModule } from '@app/shared/select-form/select-form.module';

// import { StatsModule} from './stats/stats.module'
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
    // DialogModule,
    // SmartadminLayoutModule,
    // BootstrapModule,
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
    // BrowserAnimationsModule,
    // DropdownModule,
    // ProgressBarModule,
    // InputTextModule,
    // SmartadminLayoutModule,
    // BootstrapModule,

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
