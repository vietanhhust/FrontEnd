import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CMSAccountComponent } from './cmsaccount/cmsaccount.component';
import { CMSRoutingRoutes } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CMSCategoryItemComponent } from './cms-category-item/cms-category-item.component';
import { CMSCategoryitemAddComponent } from './cms-category-item/cms-categoryitem-add/cms-categoryitem-add.component';
import { CMSCategoryitemEditComponent } from './cms-category-item/cms-categoryitem-edit/cms-categoryitem-edit.component';
import { CMSAccountCreateComponent } from './cmsaccount/cms-account-create/cms-account-create.component';
import { CMSBalanceComponent } from './cmsaccount/cms-balance/cms-balance.component';
import { CMSAccountPutComponent } from './cmsaccount/cms-account-put/cms-account-put.component';
import { CMSRoleComponent } from './cms-role/cms-role.component';
import { CMSRoleEditComponent } from './cms-role/cms-role-edit/cms-role-edit.component';
import { CMSRoleGrantComponent } from './cms-role/cms-role-grant/cms-role-grant.component';
import { CMSGroupClientComponent } from './cms-group-client/cms-group-client.component';
import { CMSGroupClientPutComponent } from './cms-group-client/cms-group-client-put/cms-group-client-put.component';
import { CMSChangeGroupClientComponent } from './cms-group-client/cms-change-group-client/cms-change-group-client.component';
import { CMSChatComponent } from './cms-chat/cms-chat.component';
import { CMSDashboardComponent } from './cms-dashboard/cms-dashboard.component';
import { CMSOrderComponent } from './cms-order/cms-order.component';
import { CMSOrderIncurredComponent } from './cms-order/cms-order-incurred/cms-order-incurred.component';
import { CMSAccountChooseComponent } from './cmsaccount/cms-account-choose/cms-account-choose.component';
import { CMSOrderPutComponent } from './cms-order/cms-order-put/cms-order-put.component';
import { CMSCaptureComponent } from './cms-dashboard/cms-capture/cms-capture.component';
import { CmsHistoryComponent } from './cms-history/cms-history.component';
import { CMSHistoryBalanceComponent } from './cms-history/cms-history-balance/cms-history-balance.component';
import { CMSHistoryBalanceTableComponent } from './cms-history/cms-history-balance-table/cms-history-balance-table.component';
import { CmsHistoryOrderComponent } from './cms-history/cms-history-order/cms-history-order.component';
import { CMSManagingAccountChooseComponent } from './cms-history/cms-managing-account-choose/cms-managing-account-choose.component';
import { CMSClientChooseComponent } from './cms-history/cms-client-choose/cms-client-choose.component';
import { CMSPopupDetailOrderComponent } from './cms-history/cms-history-order/cmspopup-detail-order/cmspopup-detail-order.component';


@NgModule({
  declarations: [
    CMSAccountComponent,
    CMSCategoryItemComponent,
    CMSCategoryitemAddComponent, 
    CMSCategoryitemEditComponent, CMSAccountCreateComponent, CMSBalanceComponent, CMSAccountPutComponent, CMSRoleComponent, CMSRoleEditComponent, CMSRoleGrantComponent, CMSGroupClientComponent, CMSGroupClientPutComponent, CMSChangeGroupClientComponent, CMSChatComponent, CMSDashboardComponent, CMSOrderComponent, CMSOrderIncurredComponent, CMSAccountChooseComponent, CMSOrderPutComponent, CMSCaptureComponent, CmsHistoryComponent, CMSHistoryBalanceComponent, 
    CMSHistoryBalanceTableComponent, CmsHistoryOrderComponent, 
    CMSManagingAccountChooseComponent, 
    CMSClientChooseComponent, CMSPopupDetailOrderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CMSRoutingRoutes,
    SharedModule
  ], 
  exports: [
    CMSAccountComponent, 
    CMSCategoryItemComponent, 
    CMSCategoryitemEditComponent
  ]
})
export class CMSModule { }
