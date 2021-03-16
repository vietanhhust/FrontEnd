import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { AccountModel } from '../../cmsModel/account.model';
import { CMSManagingAccountModel } from '../../cmsModel/managingAccount.model';
import { CMSManagingAccountService } from '../../cmsServices/cms-managingAccount.service';
import { CMSGroupClientService } from '../../cmsServices/cms-group-client.service';
import { CMSClientModel } from '../../cmsModel/group-client.model';
declare let $: any; 
@Component({
  selector: 'app-cms-client-choose',
  templateUrl: './cms-client-choose.component.html',
  styleUrls: ['./cms-client-choose.component.scss']
})
export class CMSClientChooseComponent implements OnInit, IModalComponent {
  @Input() data; 
  @Output() close = new EventEmitter(); 


  keyword: string = ''
  lstAccount: CMSClientModel[] = []
  constructor(public cmsGroupClientService: CMSGroupClientService) { }

  ngOnInit(): void {
    this.search(this.keyword); 
  }

  search(keyword?: string){
    this.cmsGroupClientService.getAllClient({moduleId: CSMEnumModule.GroupClientView}).subscribe(res=>{
      this.lstAccount = res; 
    })
  }


  onDbClick(item: CMSClientModel){
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
        title: 'Máy ',
        value: 'clientId', 
        isCheckBox: false
      }, {
        title: 'Mô tả', 
        value: 'description', 
        isCheckBox: false
      }
    ]
  }
}
