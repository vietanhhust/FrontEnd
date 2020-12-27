import { Component, OnInit, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { ToastrService } from 'ngx-toastr';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { AccountModel } from '../../cmsModel/account.model';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';

@Component({
  selector: 'app-cms-account-put',
  templateUrl: './cms-account-put.component.html',
  styleUrls: ['./cms-account-put.component.scss']
})
export class CMSAccountPutComponent implements OnInit, IModalComponent {

  @Input() data; 
  @Output() close = new EventEmitter(); 

  accountModel: AccountModel = {
    balance: 0, address: '', credit: 0, debit: 0, elaspedTime: 0, email: '', description: '', isActived: null, 
    accountName: '',id: 0, isLogged: false, password: '', phoneNumber: '', identityNumber: '', status: ''
  }
  constructor(public cmsAccountService: CMSAccountService, public cmsSessionService: CMSSessionService,
    public toast: ToastrService, public renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.cmsAccountService.getAccountDetail({moduleId: CSMEnumModule.AccountView}, this.data.id).subscribe(res=>{
      this.accountModel = res; 
      if(this.accountModel.isLogged){
        this.accountModel.status = "Đang sử dụng"
      }
    })
  }

  save(){
    this.cmsAccountService.putAccount({moduleId: CSMEnumModule.AccountPut}, this.data.id, this.accountModel).
      subscribe(res=>{
        if(res){
          this.toast.success("Cập nhật thành công"); 
          this.close.next(true);
        }
      })
  }
}
