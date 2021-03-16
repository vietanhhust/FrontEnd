import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { AccountModel } from '../../cmsModel/account.model';
import { CMSManagingAccountModel } from '../../cmsModel/managingAccount.model';
import { CMSManagingAccountService } from '../../cmsServices/cms-managingAccount.service';
declare let $: any; 
@Component({
  selector: 'app-cms-managing-account-choose',
  templateUrl: './cms-managing-account-choose.component.html',
  styleUrls: ['./cms-managing-account-choose.component.scss']
})
export class CMSManagingAccountChooseComponent implements OnInit, IModalComponent {
  @Input() data; 
  @Output() close = new EventEmitter(); 


  keyword: string = ''
  lstAccount: CMSManagingAccountModel[] = []
  constructor(public cmsManagingAccountService: CMSManagingAccountService) { }

  ngOnInit(): void {
    this.search(this.keyword); 
  }

  search(keyword?: string){
    this.cmsManagingAccountService.searchManagingAccount({moduleId: CSMEnumModule.AccountView}, keyword).subscribe(res=>{
      this.lstAccount = res; 
    })
  }


  onDbClick(item: CMSManagingAccountModel){
    this.close.next(item);
  }

  highlight(item: AccountModel){
    $('.ccid').removeClass('active');
    //$('#row_' + i['frontendCode'] ).addClass('active');
  }

  chooseAccount(){
  }


  tableConfig = {
    columns: [
      {
        title: 'Tên tài khoản',
        value: 'name', 
        isCheckBox: false
      }, {
        title: 'Mô tả', 
        value: 'description', 
        isCheckBox: false
      }
    ]
  }
}
