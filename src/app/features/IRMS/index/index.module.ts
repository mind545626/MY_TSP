import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';


import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

// ------------------載用彈窗------------------
// import { FEBillboardDetailComponent } from './febillboard-detail/febillboard-detail.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { FEBillboardComponent } from '@app/features/IRMS/index/pop-up/FEBillboard/FEBillboard.component';
import { FENewsComponent } from './pop-up/FENews/FENews.component';
// ------------------------------------

// ------------------載入伺服器------------------
import { CustomerService } from '@app/services/customerservice';
import { TestIrmsService } from '@app/core/services/TestIrms.service';
// ---------------------------------------------

@NgModule({
    imports: [
        IndexRoutingModule,

        SharedModule,
        // primebg搭載的彈出小視窗
        DialogModule,
        DynamicDialogModule,
        //----------------------
        TableModule,
        RouterModule.forChild([{
            path: '', component: IndexComponent
        }]),

    ],
    declarations: [
        IndexComponent,
        FEBillboardComponent,
        FENewsComponent,

    ],
    bootstrap: [
        IndexComponent
    ],
    providers: [
        CustomerService,
        TestIrmsService
    ],
    entryComponents: [
    FEBillboardComponent,
    FENewsComponent,
    ]
})
export class IndexModule {

    handleClick() {
        //execute action
    }


}
