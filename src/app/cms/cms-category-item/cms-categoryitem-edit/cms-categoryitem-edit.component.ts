import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSCategoryService } from '../../cmsServices/cms-category.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CategoryModel, CategoryItemModel } from '../../cmsModel/categoryItem.model';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumStaticContent } from 'src/app/common/config/statics';
import { FileObject } from 'src/app/core/services/base/base.service';
import { ApiEndpoint, ServerIp } from 'src/app/core/models/base/CMSSession.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms-categoryitem-edit',
  templateUrl: './cms-categoryitem-edit.component.html',
  styleUrls: ['./cms-categoryitem-edit.component.scss']
})
export class CMSCategoryitemEditComponent implements OnInit, IModalComponent, OnDestroy {

  @Input() data;
  @Output() close = new EventEmitter();

  lstCategory: CategoryModel[] = []
  lstCategoryData: {
    title: string,
    value: number
  }[] = []
  categoryItem: CategoryItemModel = {
    categoryId: 1,
    categoryItemName: '', categoryName: '', imageUrl: '', unitPrice: 10000
  }

  constructor(public cmsCategoryItemService: CMSCategoryService, public cmsSessionService: CMSSessionService,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.cmsCategoryItemService.getCategory({ moduleId: CSMEnumModule.CategoryView }).subscribe(
      data => {
        this.lstCategory = data;
        this.lstCategory.forEach(item => {
          this.lstCategoryData.push({
            title: item.categoryName,
            value: item.id
          })
        });
        this.cmsCategoryItemService.getCategoryItemDetail({ moduleId: CSMEnumModule.CategoryView }, this.data.id).subscribe(item => {
          this.categoryItem = item as CategoryItemModel;
          console.log(this.categoryItem);
          if (item.imageUrl) {
            this.link = `http://${ServerIp}/categoryItemImage/` + item.imageUrl;
          } else {
            this.link = EnumStaticContent.NoImage;
          }
        })
      }
    )
  }

  // Dành cho việc tải ảnh lên
  image;
  link = '';
  onchange(file: FileList) {
    if (!file.item.length) {
      this.image = EnumStaticContent.NoImage;
      return;
    }
    try {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        this.data.avatarUrl = event.target.result;
      };
      fileReader.readAsDataURL(file[0]);
      const fobj = new FileObject(file[0], 'file');
      this.cmsCategoryItemService.uploadCategoryImage({ moduleId: CSMEnumModule.CategoryCreate }, fobj)
        .subscribe(data => {
          console.log(data);
          this.link = `http://${ServerIp}/categoryItemImage/` + data.fileName;
          this.categoryItem.imageUrl = data.fileName;
        });
    } catch {
      this.link = EnumStaticContent.NoImage;
    }

  }

  save() {
    if (this.categoryItem.imageUrl == EnumStaticContent.NoImage) {
      this.categoryItem.imageUrl = ''
    }
    this.categoryItem.unitPrice = +this.categoryItem.unitPrice as number;
    this.cmsCategoryItemService.putCategoryItem({ moduleId: CSMEnumModule.CategoryPut }, this.data.id, this.categoryItem).subscribe(data => {
      this.toast.success('Cập nhật sản phẩm thành công');
      this.close.next(true);
    })
  }

  ngOnDestroy() {

  }
}
