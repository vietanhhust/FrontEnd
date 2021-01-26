import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { AccountModel } from '../../cmsModel/account.model';
declare let $: any; 
@Component({
  selector: 'app-cms-account-choose',
  templateUrl: './cms-account-choose.component.html',
  styleUrls: ['./cms-account-choose.component.scss']
})
export class CMSAccountChooseComponent implements OnInit, IModalComponent {
  @Input() data; 
  @Output() close = new EventEmitter(); 


  keyword: string = ''
  lstAccount: AccountModel[] = []
  constructor(public cmsAccountService: CMSAccountService) { }

  ngOnInit(): void {
    this.search(this.keyword); 
  }

  search(keyword?: string){
    this.cmsAccountService.getAccountByKeyword({moduleId: CSMEnumModule.AccountView}, keyword).subscribe(res=>{
      this.lstAccount = res; 
    })
  }


  onDbClick(item: AccountModel){
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
        value: 'accountName', 
        isCheckBox: false
      }, {
        title: 'Mô tả', 
        value: 'description', 
        isCheckBox: false
      }
    ]
  }
}
