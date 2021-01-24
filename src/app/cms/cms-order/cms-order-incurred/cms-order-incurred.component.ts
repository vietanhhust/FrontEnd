import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSCategoryOrderSubject, CMSCategoryModel } from '../../cmsModel/order.model';
import { CategoryItemModel } from '../../cmsModel/categoryItem.model';
import { CMSCategoryService } from '../../cmsServices/cms-category.service';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ToastrService } from 'ngx-toastr';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';

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
  lstSelect: {
    title: string,
    value: number
  }[] = []

  id = 0;
  constructor(private cmsCategoryService: CMSCategoryService, private popup: PopupComponent,
    private toast: ToastrService) {

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
      console.log(this.lstSelect);
    });
  }

  // Thêm sản phẩm
  addOrder() {
    this.lstOrder.push({
      CategoryId: 1,
      CategoryName: '',
      Quantity: 1,
      UnitPrice: 0
    })
  }

  // Add số lượng của 1 loại item. 
  addQuantity(item: CMSCategoryModel) {
    item.Quantity = item.Quantity + 1;
  }

  // Minus số lượng một loại item. 
  minusQuantity(item: CMSCategoryModel) {
    if (item.Quantity > 1)
      item.Quantity = item.Quantity - 1;
  }

  // Remove sản phẩm khỏi list
  removeCategory(item: CMSCategoryModel){
    let index = this.lstOrder.indexOf(item, 0);
    if (index > -1) {
      this.lstOrder.splice(index, 1);
    }
  }

  // Khi chọn category 
  categoryChoose(item: CMSCategoryModel){
    console.log(item);
    console.log(this.lstCategory);
    item.CategoryName = this.lstCategory.find(item=>item.id==item.id).categoryItemName;
  }



  // Lưu lại
  save() {
    console.log(this.lstOrder);
  }
}
