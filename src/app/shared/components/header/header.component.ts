import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Router } from '@angular/router';
import { PageTitleService } from './../../../core/services/base/page-title.service';
import { EnumModule } from 'src/app/common/constants/global/Enums';
import { sortBy, cloneDeep } from 'lodash';
import { BusinessInfoService } from 'src/app/core/services/system/businessInfo.service';
import { Store, select } from '@ngrx/store';
import { MenuOutputModel, BusinessInfo } from 'src/app/core/models/system/businessinfo.model';
import { Module, RolePermission } from 'src/app/core/models/system/role.model';
import { UserOutput } from 'src/app/core/models/system/user.model';
import { PopupService } from '../../services/popup.service';
import { ListErrorComponent } from '../popup-detail-error/list-error/list-error.component';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
declare let $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  EnumModule = EnumModule;
  uri: MenuOutputModel;
  label: MenuOutputModel;
  lstPage: MenuOutputModel[];
  curentPermission: Module;
  lstPermission: RolePermission[];
  lstFather: MenuOutputModel[];
  recursiveList: any;
  searchList = [];
  isActive = false;
  isExpand = false;
  keyword = '';
  logo = null;
  avatar = null;
  Company = null;
  user: UserOutput;
  nameSplit = null;
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _pagetitle: PageTitleService,
    private businessInfoService: BusinessInfoService,
    private infoCompany: Store<{ infoCompany: BusinessInfo }>,
    private logoCompany: Store<{ logoCompany: string }>,
    private menuInfo: Store<{ menuInfo: any }>, 
    private popup: PopupService, 
    private cmsSessionService: CMSSessionService
  ) { }

  ngOnInit() {
    this.lstPermission = this.sessionService.permission;
    if (this.lstPermission.length < 1) {
      return;
    }

    this.sessionService.getCurentInfo().subscribe(r => {
      this.user = r;
      if (this.user.fullName && this.user.fullName.split(' ').length > 1) {
        this.nameSplit = this.user.fullName.split(' ')[this.user.fullName.split(' ').length - 1].substring(0, 1);
      }
      if (r.avatarFileId) {
        
      }
    });

    this.menuInfo.pipe(select('menuInfo')).subscribe(data => {
      if (data && data.items && Array.isArray(data.items)) {
        this.transferMenu(data.items);
      }
    });
    this.loadbussiness();
  }

  transferMenu(data) {
    const $this = this;
    this.lstPage = cloneDeep(data);
    this.lstPage = sortBy(this.lstPage, ['sortOrder']);
    this.lstFather = this.lstPage.filter(x => x.parentId === 0);


    let menu = this.lstFather.filter(x => x.url === this.router.url.toString())[0];
    menu === undefined ? menu = this.lstFather.find(x => x.url.replace('/', '').replace('/', '') === this.router.url.toString().split('/')[1]) : menu = menu;
    menu === undefined ? menu = this.lstFather[0] : menu = menu;

    this.recursiveList = this.lstPage.filter(x => x.parentId === menu.menuId || x.menuName.includes('(Admin)'));

    this.recursiveList.forEach(item => {
      this.getTreeMenu(item, 1);
    });

    this.label = menu;
    this._pagetitle.GenerateTitle({
      title: 'VERP - ' + menu.menuName
    });
  }


  getTreeMenu(node: any, level: number) {

    // xử lý với trường param
    (node.param && node.param !== undefined) ?
      node.param = this.parseJson(node.param.toString().replace(/'/g, '"')) :
      node.param = node.param;

    // ghi lại level của menu;
    node.level = level;
    level++;
    // quyền show của node menu
    // quyền show của node menu
    const selecPermission = this.lstPermission.find(z => z.moduleId === node.moduleId && (!node.objectTypeId || node.objectTypeId == z.objectTypeId && node.objectId == z.objectId));
    if (!node.moduleId || selecPermission) {
      node.isShow = true;
    } else {
      node.isShow = false;
    }

    node.child = this.lstPage.filter(item => item.parentId === node.menuId);
    if (node.child.length > 0) {
      node.child.forEach(item => {
        this.getTreeMenu(item, level)
      })
    }

    if (node.child && node.child.length) {

      node.child = node.child.filter(c => c.isShow);

      if (node.child && node.child.length) {
        node.isShow = true;
      } else {
        node.isShow = false;
      }
    } else {
      if (!node.url || node.url.length < 4)
        node.isShow = false;
    }

    if (node.isDisabled) {
      node.isShow = false;
    }
  }

  showSearch() {
    if (this.isActive && this.searchList.length === 0) {
      this.searchList = [];
      this.lstPage.forEach(x => {
        if (x.url.length > 3) {
          const selecPermission = this.lstPermission.filter(z => z.moduleId === x.moduleId);
          if (selecPermission.length > 0 || x.moduleId === 0) {
            let par = cloneDeep(x.param);
            (par && par !== undefined && typeof par !== 'object') ? par = this.parseJson(par.toString().replace(/'/g, '"')) : par = par;
            x.param = par;
            this.searchList.push(x);
          }
        }
      });
    }
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    }, 300);
  }


  loadbussiness() {
    this.businessInfoService.getInfo({ moduleId: EnumModule.Me }).subscribe(r2 => {
      if (r2) {
        this.Company = r2;
       
        this.getAvartar(r2.logoFileId);
      }
    });
  }

  getAvartar(id) {
    if (id) {
     
    }
  }

  parseJson(obj) {
    try {
      JSON.parse(obj);
    } catch (e) {
      return false;
    }
    return JSON.parse(obj);
  }
  loguot() {
    this.sessionService.clear();
    this.cmsSessionService.clearStorage(); 
    this.router.navigateByUrl('logins');
  }

  // Mở pop up danh sách lỗi 
  // openListError(){
  //   this.popup.open(ListErrorComponent,{}, res=>{})
  // }
}

