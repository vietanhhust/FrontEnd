import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSCategoryOrderSubject, CMSCategoryModel, CMSOrderCreating } from '../../cmsModel/order.model';
import { CategoryItemModel } from '../../cmsModel/categoryItem.model';
import { CMSCategoryService } from '../../cmsServices/cms-category.service';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ToastrService } from 'ngx-toastr';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { CMSGroupClientService } from '../../cmsServices/cms-group-client.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSAccountChooseComponent } from '../../cmsaccount/cms-account-choose/cms-account-choose.component';
import { AccountModel } from '../../cmsModel/account.model';
import { clone } from 'lodash';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSTimeService } from '../../cmsServices/cms-time.service';
import { CMSOrderService } from '../../cmsServices/cms-order.service';

@Component({
  selector: 'app-cms-order-incurred',
  templateUrl: './cms-order-incurred.component.html',
  styleUrls: ['./cms-order-incurred.component.scss']
})
export class CMSOrderIncurredComponent implements OnInit, IModalComponent {
  @Input() data;
  @Output() close = new EventEmitter();
  accountModel = {};

  // List đồ mới
  lstOrder: CMSCategoryModel[] = []
  lstCategory: CategoryItemModel[] = [];
  // lst danh mục
  lstSelect: {
    title: string,
    value: number
  }[] = []

  // lst client
  lstClient: {
    title: string,
    value: number
  }[] = [];

  clientId: number = null;
  clientNumber: number = null;
  accountId: number = null;
  accountName: string = '';
  // Biến tổng số tiền.
  total: number = 0;
  id = 0;
  constructor(private cmsCategoryService: CMSCategoryService, private popup: PopupService,
    private toast: ToastrService, private cmsGroupClientService: CMSGroupClientService, private cmsSessionService: CMSSessionService,
    private cmsTimeService: CMSTimeService, private cmsOrderService: CMSOrderService
  ) {

  }

  ngOnInit(): void {
    this.lstOrder = [];
    this.lstCategory = [];
    this.getCategories();
  }

  // Lấy về danh sách category 
  getCategories() {
    this.cmsCategoryService.getCategoryItem({ moduleId: CSMEnumModule.CategoryView }, '').subscribe(res => {
      this.lstCategory = res;
      this.lstCategory.forEach(item => {
        this.lstSelect.push({
          title: item.categoryItemName,
          value: item.id
        })
      })

      this.cmsGroupClientService.getAllClient({ moduleId: CSMEnumModule.GroupClientView }).subscribe(res => {
        res.forEach(item => {
          this.lstClient.push({
            title: "Máy " + item.clientId.toString(),
            value: item.id
          })
        })
      });

    });
  }

  // Thêm sản phẩm
  addOrder() {
    this.lstOrder.push({
      CategoryId: 1,
      CategoryName: '',
      Quantity: 1,
      UnitPrice: this.lstCategory.find(item => item.id == 1).unitPrice
    })
    this.caculatePrice();
  }

  // Add số lượng của 1 loại item. 
  addQuantity(item: CMSCategoryModel) {
    item.Quantity = item.Quantity + 1;
    this.caculatePrice();
  }

  // Minus số lượng một loại item. 
  minusQuantity(item: CMSCategoryModel) {
    if (item.Quantity > 1)
      item.Quantity = item.Quantity - 1;
    this.caculatePrice();
  }

  // Remove sản phẩm khỏi list
  removeCategory(item: CMSCategoryModel) {
    let index = this.lstOrder.indexOf(item, 0);
    if (index > -1) {
      this.lstOrder.splice(index, 1);
    }
    this.caculatePrice();
  }

  // Khi chọn category 
  categoryChoose(order: CMSCategoryModel) {
    setTimeout(() => {
      order.CategoryName = this.lstCategory.find(item => item.id == order.CategoryId).categoryItemName;
      order.UnitPrice = this.lstCategory.find(item => item.id == order.CategoryId).unitPrice;
      this.caculatePrice();
    })

  }

  // Chọn tài khoản
  chooseAccount() {
    this.popup.open(CMSAccountChooseComponent, {}, (res: AccountModel) => {
      if (res) {
        this.accountId = res.id;
        this.accountName = res.accountName;
      }
    })
  }




  // Hiển thị tổng số tiền
  caculatePrice() {
    this.total = 0;
    this.lstOrder.forEach(item => {
      this.total += item.UnitPrice * item.Quantity;
    })
  }


  groupByPrice(array: CMSCategoryModel[]) {
    let arr = clone(array).sort((a, b) => {
      return a.CategoryId < b.CategoryId ? -1 : (a == b) ? 0 : 1
    })
    let result: CMSCategoryModel[] = [];
    arr.reduce(function (res, value: CMSCategoryModel) {
      if (!res[value.CategoryId]) {
        res[value.CategoryId] = { CategoryId: value.CategoryId, Quantity: 0, CategoryName: value.CategoryName, UnitPrice: value.UnitPrice };
        result.push(res[value.CategoryId])
      }
      res[value.CategoryId].Quantity += value.Quantity;
      return res;
    }, {});

    return result;
  }

  // Lưu lại
  save() {
    let orderCreating: CMSOrderCreating = {
      AdminId: this.cmsSessionService.getCMSSession().adminId,
      ClientId: this.clientId,
      CreatedTime: this.cmsTimeService.getCurrentUnix(),
      accountId: this.accountId,
      ListCategory: this.groupByPrice(this.lstOrder)
    }
    this.cmsOrderService.acceptOrder({ moduleId: CSMEnumModule.AcceptOrder }, orderCreating).subscribe(res => {
      let clientId = null;
      if (this.clientId)
        clientId = this.lstClient.find(item => item.value == this.clientId).title.split(' ')[1];
      this.close.emit({
        id: res,
        model: orderCreating,
        accountName: this.accountName,
        clientId: clientId ? clientId : null
      })
    })

  }
}
