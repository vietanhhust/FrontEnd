import { Component, OnInit, Renderer2, AfterViewInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


import { UserService } from 'src/app/core/services/system/user.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { EnumModule, EnumRoleStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { AppConfig } from 'src/app/common/config/app.config';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { SessionService } from 'src/app/core/services/base/session.service';
import { takeUntil } from 'rxjs/operators';
import { RoleEditComponent } from 'src/app/system/roles/role-edit/role-edit.component';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { RoleOutput } from 'src/app/core/models/system/role.model';
import { Store } from '@ngrx/store';
import { deleteRoleGroup } from '../role-store/role.actions';
import { RoleAddComponent } from '../role-add/role-add.component';

declare let $: any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent implements IModalComponent {
  close: import("@angular/core").EventEmitter<any>;
  lstRoleStatus: any[] = getSelectOptions(EnumRoleStatus);
  data = [];
  dataFilled = [];
  selectedValueTab: any;
  total: number;
  pageIndex: number;
  totalPage: number;
  fromRecord: number;
  toRecord: number;
  limit: number = AppConfig.generate.pagesize;
  keyword = '';
  configTable = {};
  isShowPage = false;

  listener: any;

  roleIdInput;
  isPress = false;
  constructor(
    router: Router,
    sessionService: SessionService,
    private userservice: UserService,
    private roleservice: RoleService,
    private toast: ToastMessageService,
    private popup: PopupService,
    private render2: Renderer2,
    private store: Store<any>
  ) {
    super(EnumModule.Role, EnumAction.View, router, sessionService);
    this.listener = this.render2.listen('body', 'keydown', (event) => {
      console.log(event);
      let width = $('.daylatest').width();

      if (event.code == "ArrowRight") {
        width += 10;
        $('#daylatest').css({ "width": width.toString() })
        $('#zzz').css({ "width": ($('#container').width() - 6 - width).toString() });
      } else if (event.code == "ArrowLeft") {
        width -= 10;
        $('#daylatest').css({ "width": width.toString() })

        $('#zzz').css({ "width": ($('#container').width() - 6 - width).toString() });
      }
    });
    this.render2.listen('body', 'click', (event) => {
      let width = $('.daylatest').width();
      $('#zzz').css({ "width": ($('#container').width() - 6 - width).toString() });
    });
    this.render2.listen('body', 'mouseup', (event) => {
      this.isPress = false;
    })
    this.render2.listen('body', 'mousemove', (event) => {
      if (this.isPress) {
        $('.daylatest').css({ "width": event.x.toString() });
        $('#zzz').css({ "width": ($('#container').width() - 6 - $('.daylatest').width()).toString() })
      }
    });
  }

  ngOnDestroy() {
    this.listener();
  }
  ngOnInit() {

    super.ngOnInit();

    this.keyword = '';
    this.search(1);
    this.configTable = {
      columns: [
        {
          title: 'Tên',
          value: 'roleName',
          isShow: true
        },

        {
          title: 'Mô tả',
          value: 'description',
          isShow: true
        },
        {
          title: 'Trạng thái',
          value: 'roleStatus',
          isShow: true
        },
      ],
      eventTable: [
        {
          name: 'Xem',
          icon: 'fa-eye',
          action: (item: any) => {
            this.router.navigate(['/system/roles/edit', item.roleId], { queryParams: { viewmode: '' } });
          }
        },
        {
          name: 'Sửa',
          icon: 'fa-edit',
          type: 'edit',
          isShow: this.curentPermission.isUpdate,
          action: (item: any) => {
            this.viewmode(item)
          }
        },
        {
          name: 'Phân quyền',
          icon: 'fa-user',
          type: 'edit',
          isShow: this.curentPermission.isCensor,
          action: (item: any) => {
            this.router.navigate(['/system/roles/grant', item.roleId]);
          }
        },
        {
          name: 'Xóa',
          icon: 'fa-trash',
          type: 'del',
          isShow: this.curentPermission.isDelete,
          action: (item: any) => {
            this.delete(item);
          }
        },
      ]
    };



    // Or with jQuery




  }
  viewmode(e) {
    console.log(e);
    //e.roleId
    this.popup.open(RoleEditComponent, { id: e.roleId }, () => { }, []);
  }
  nextPage() {
    if (this.pageIndex < this.totalPage) {
      this.pageIndex++;
      this.search(this.pageIndex);
    }
  }
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.search(this.pageIndex);
    }
  }
  search(page) {
    this.isShowPage = false;
    this.pageIndex = page;
    this.roleservice.getAll(this, this.keyword, this.pageIndex, this.limit)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(

        r => {

          if (r) {
            this.data = [];
            // this.data = r.data.list;
            this.total = r.total;
            this.roleservice.getLevelTree(r.list, null)
              .forEach(l => {
                this.data.push(l);
              });
            this.data.filter((x) => {
              x.roleStatus = this.getRoleStatus(x.info.roleStatusId);
              x.roleName = this.getDash(x.level - 1) + x.info.roleName,
                x.description = x.info.description,
                x.roleId = x.info.roleId
            });
            // this.dataFilled = this.data;
            if (r.total % this.limit > 0) {
              this.totalPage = (r.total / this.limit) + 1;
            } else {
              this.totalPage = (r.total / this.limit);
            }
            this.totalPage = Math.floor(this.totalPage);
            this.fromRecord = ((this.pageIndex - 1) * this.limit) + 1;
            this.toRecord = (this.pageIndex * this.limit);
            this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
            this.isShowPage = true;
          }
        });
  }
  getRoleStatus(status: number) {
    const statusSelect = this.lstRoleStatus.filter(x => x.value === status);
    if (statusSelect === null || statusSelect.length < 1) {
      return '';
    }
    return statusSelect[0].title;
  }
  delete(item: RoleOutput) {

    this.popup.confirm(`Bạn có muốn xóa quyền này không?`, `Thông báo`)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((ok) => {
        if (ok) {
          this.store.dispatch(deleteRoleGroup({
            context: this,
            payload: {
              roleId: item.roleId,
              component: this
            }
          }))
        }
      })
  }




  move(event: any) {
    if (this.isPress) {
      $('.daylatest').css({ 'width': event.x.toString() });
    }
  }

  onModalClick() {
    this.popup.open(RoleEditComponent, { id: 22 }, () => { console.log("DoSmth") }, ['cao30'])
  }
  recieve(e: any) {
    if (this.roleIdInput != (e.info.roleId as number)) {
      //this.isShowPage = false;
      this.roleIdInput = (e.info.roleId as number);
    }

    console.log(this.roleIdInput);
  }


  mousePress(e: any) {
    this.isPress = !this.isPress;

  }

  reset() {
    this.keyword = '';
    this.search(1);
  }

  ondone(e: any) {
    this.isShowPage = true;
  }

  addNewRoleGroup() {
    this.popup.open(RoleAddComponent, {}, (data) => {
      this.search(1);
    }, [])
  }
}
