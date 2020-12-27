import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { ToastrService } from 'ngx-toastr';
import { AccountModel } from '../../cmsModel/account.model';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';

@Component({
  selector: 'app-cms-account-create',
  templateUrl: './cms-account-create.component.html',
  styleUrls: ['./cms-account-create.component.scss']
})
export class CMSAccountCreateComponent implements OnInit, IModalComponent, OnDestroy {

  @Input() data;
  @Output() close = new EventEmitter();

  accountModel: AccountModel= {
    accountName: '', password: '', address: '', description: '', identityNumber:'', email: '', 
    balance: 0, elaspedTime: 0, isActived: true, isLogged: false, credit: 0, debit: 0, phoneNumber: '', 
    status: ''
  }
  

  constructor(public cmsAccountService: CMSAccountService, public cmsSessionService: CMSSessionService, 
      private toast: ToastrService
    ) {

  }

  ngOnInit(): void {
  
  }

  // Lưu lại 
  save() {
    this.cmsAccountService.createAccount({moduleId: CSMEnumModule.AccountCreate}, this.accountModel).subscribe(res=>{
      this.toast.success("Tạo mới tài khoản thành công");
      this.close.next(true);
    })
  }

  ngOnDestroy() {

  }
}
