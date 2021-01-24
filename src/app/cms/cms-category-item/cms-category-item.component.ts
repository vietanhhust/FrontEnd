import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryModel, CategoryItemModel } from '../cmsModel/categoryItem.model';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { Router } from '@angular/router';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSCategoryService } from '../cmsServices/cms-category.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSCategoryitemAddComponent } from './cms-categoryitem-add/cms-categoryitem-add.component';
import { CMSCategoryitemEditComponent } from './cms-categoryitem-edit/cms-categoryitem-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms-category-item',
  templateUrl: './cms-category-item.component.html',
  styleUrls: ['./cms-category-item.component.scss']
})
export class CMSCategoryItemComponent extends CMSBaseComponent implements OnInit, OnDestroy {

  keyword: any = '';
  selectedValueTab: CategoryItemModel = {}
  lstCategory: CategoryModel[] = [];
  lstCategoryItem: CategoryItemModel[] = []

  isShowPage = false;
  constructor(public router: Router,public cmsSessionService: CMSSessionService, 
    private cmsCategoryService: CMSCategoryService,private popup: PopupService, 
    private toast: ToastrService
    ) {
    super(CSMEnumModule.CategoryView, EnumAction.View, router, cmsSessionService);
  }

  ngOnInit(): void {
    super.ngOnInit(); 
    this.search(this.keyword);
  }

  search(keyword: string=''){
    this.cmsCategoryService.getCategory({moduleId: CSMEnumModule.CategoryView}).subscribe(
      categories=>{
        this.lstCategory = categories;
        this.cmsCategoryService.getCategoryItem({moduleId: CSMEnumModule.CategoryView}, keyword).subscribe(items=>{
          this.lstCategoryItem = items;
          this.lstCategoryItem.forEach(item=>{
            item.categoryName = this.lstCategory.find(x=>x.id==item.categoryId).categoryName;
            this.isShowPage = true; 
            
          })
          console.log(this.lstCategoryItem);
        },e=>{
          this.isShowPage = true;
        })
      },e=>{
        this.isShowPage = true;
      }
    )
  }

  // Dbl Click 
  viewmode(item: CategoryItemModel){
    if(this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.CategoryPut)){
      this.popup.open(CMSCategoryitemEditComponent, {id: item.id}, res=>{
        if(res){
          this.search(this.keyword); 
        }
      })
    }
  }

  // Tạo categoryItem mới
  addCategoryItem(){
    this.popup.open(CMSCategoryitemAddComponent, {}, res=>{
      this.search(this.keyword);
    });
  }


  configTable = {
    columns: [
      {
        title: "Tên danh mục",
        value: "categoryItemName",
        isShow: true
      },
      {
        title: "Nhóm danh mục",
        value: "categoryName",
        isShow: true
      },
      {
        title: "Giá",
        value: "unitPrice",
        isShow: true
      }
    ],

    eventTable: [
      {
        name: 'Sửa',
        icon: 'fa-eye',
        action: (item: any) => {
          this.viewmode(item);
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.CategoryPut)
      },
      {
        name: 'Xóa',
        icon: 'fa-trash',
        action: (item: CategoryItemModel) => {
          this.popup.confirm("Bạn có muốn xóa sản phẩm này không", "Xóa " + item.categoryItemName).subscribe(data=>{
            if(data){
              this.cmsCategoryService.deleteCategoryItem({moduleId: CSMEnumModule.CategoryDetele}, item.id).subscribe(res=>{
                if(res){
                  this.toast.success("Xóa danh mục thành công");
                  this.search(this.keyword);
                }
              })
            }
          })
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.CategoryDetele)
      },
      {
        name: 'Tạo mới',
        icon: 'fa-eye',
        action: (item: any) => {
          this.addCategoryItem(); 
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.CategoryCreate)
      }
    ]

  }

  ngOnDestroy(){
  }
}
