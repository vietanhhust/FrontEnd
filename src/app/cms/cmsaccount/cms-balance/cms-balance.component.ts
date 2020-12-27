import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { AccountModel } from '../../cmsModel/account.model';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms-balance',
  templateUrl: './cms-balance.component.html',
  styleUrls: ['./cms-balance.component.scss']
})
//Form này dùng để trừ tiền và nạp tiền, dùng biến boolean isAddBalance
//this.data.id: lấy id của tài khoản 
export class CMSBalanceComponent implements OnInit, IModalComponent {

  @Input() data; 
  @Output() close = new EventEmitter(); 

  accountModel: AccountModel = {
    balance: 0, 
    accountName: '', 
    status: ''
  }

  money: number = 0; 
  constructor(public cmsAccountService: CMSAccountService, private renderer: Renderer2, private toast: ToastrService) { }

  ngOnInit(): void {
    // Lấy tài khoản về.
    this.cmsAccountService.getAccountDetail({moduleId: CSMEnumModule.AccountView}, this.data.id).subscribe(res=>{
      this.accountModel = res;
    })
  }

  // Submit trừ hoặc nạp tiền.
  save(){
    if(this.data.isAddBalance){
      this.cmsAccountService.addBalanceAccount({moduleId: CSMEnumModule.AccountAddBalance}, {
        AccountId: this.accountModel.id, 
        money: this.money
      }).subscribe(res=>{
        this.toast.success("Nạp tiền vào tài khoản thành công")
        this.close.next(true);
      })
    }else{
      this.cmsAccountService.refundAccount({moduleId: CSMEnumModule.AccountMinusBalance}, {
        AccountId: this.accountModel.id, 
        money: this.money
      }).subscribe(res=>{
        this.toast.success("Trừ tiền tài khoản thành công"); 
        this.close.next(true);
      })
    }
  }

}
