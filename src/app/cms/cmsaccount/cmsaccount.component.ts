import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { Router } from '@angular/router';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { ToastrService } from 'ngx-toastr';
import { AccountModel } from '../cmsModel/account.model';
import { CMSAccountService } from '../cmsServices/cms-account.service';
import { CMSAccountCreateComponent } from './cms-account-create/cms-account-create.component';
import { CMSBalanceComponent } from './cms-balance/cms-balance.component';
import { CMSAccountPutComponent } from './cms-account-put/cms-account-put.component';

@Component({
  selector: 'app-cmsaccount',
  templateUrl: './cmsaccount.component.html',
  styleUrls: ['./cmsaccount.component.scss']
})
export class CMSAccountComponent extends CMSBaseComponent implements OnInit {

  keyword: any = '';
  listAccount: AccountModel[] = [];
  selectedValueTab: AccountModel = {
    balance: 0
  }
  isShowPage = false;
  permissionEnum = CSMEnumModule;
  constructor(public router: Router, public cmsSessionService: CMSSessionService,
    private popup: PopupService, private toast: ToastrService, private cmsAccountService: CMSAccountService,
    private renderer: Renderer2) {
    super(CSMEnumModule.AccountView, EnumAction.View, router, cmsSessionService);
  }

  // Khởi tạo
  ngOnInit(): void {
    super.ngOnInit();
    this.search(this.keyword);
  }

  // Tìm kiếm tài khoản theo tên 
  public search(keyword: string = '') {
    this.cmsAccountService.getAccountByKeyword({ moduleId: CSMEnumModule.AccountView }, keyword).subscribe(data => {
      this.listAccount = data;
      this.listAccount.forEach(item => {
        if (item.isLogged) {
          item.status = "Đang sử dụng";
        } else {
        }
      });
      this.isShowPage = true;
    }, e => {
      this.isShowPage = true;
    })
  }

  //dblClick
  viewmode(event: AccountModel) {
    if(this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountPut)){
      this.popup.open(CMSAccountPutComponent, {
        id: event.id
      }, res=>{
        if(res){
          this.search(); 
        }
      })
    }
  }

  // Thêm tài khoản
  addAccount() {
    this.popup.open(CMSAccountCreateComponent, {}, res => {
      if (res) {
        this.search(this.keyword);
      }
    })
  }

  configTable = {
    columns: [
      {
        title: "Tên tài khoản",
        value: "accountName",
        isShow: true
      },
      {
        title: "Số tiền còn lại",
        value: "balance",
        isShow: true
      },
      {
        title: "Mô tả",
        value: "description",
        isShow: true
      },
      {
        title: "Trạng thái",
        value: "status",
        isShow: true
      }
    ],

    eventTable: [
      {
        name: 'Sửa',
        icon: 'fa-eye',
        action: (item: AccountModel) => {
          //this.viewmode(item);
          this.popup.open(CMSAccountPutComponent, {
            id: item.id
          }, res=>{
            if(res){
              this.search(); 
            }
          })
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountView)
      },
      {
        name: 'Xóa',
        icon: 'fa-trash',
        action: (item: AccountModel) => {
          this.popup.confirm("Bạn có muốn xóa tài khoản này không", "Xóa " + item.accountName).subscribe(data => {
            if (data) {
              this.cmsAccountService.deleteAccount({ moduleId: CSMEnumModule.AccountDelete }, item.id).subscribe(res => {
                if (res) {
                  this.toast.success("Xóa tài khoản thành công");
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
          this.addAccount();
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountCreate)
      },
      {
        name: 'Nạp tiền',
        icon: 'fa-bill',
        action: (item: AccountModel) => {
          this.popup.open(CMSBalanceComponent, { id: item.id, isAddBalance: true }, res => {
            if (res) {
              this.search(this.keyword);
            }
          });
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountAddBalance)
      },
      {
        name: 'Trả tiền',
        icon: 'fa-bill',
        action: (item: AccountModel) => {
          this.popup.open(CMSBalanceComponent, { id: item.id, isAddBalance: false }, res => {
            if (res) {
              this.search(this.keyword);
            }
          });
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountMinusBalance)
      }
    ]

  }
}
