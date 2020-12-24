import { Component, Input, SimpleChanges, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/core/services/system/role.service';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { map, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Module, ModuleActionModel, ModuleGroup, ModuleObjectModel, ModuleRolePermission, RolePermission } from 'src/app/core/models/system/role.model';
import { Store } from '@ngrx/store';
import { updateRole } from '../role-store/role.actions';
import { forkJoin } from 'rxjs';
import { cloneDeep } from 'lodash';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';

@Component({
  selector: 'app-role-grant',
  templateUrl: './role-grant.component.html',
  styleUrls: ['./role-grant.component.scss']
})
export class RoleGrantComponent 
//extends BaseComponent
 {

  // error: string;
  // lstGroup: ModuleGroup[];
  // lstModule: Module[];
  // lstCate: CategoryListModel[];

  // lstVoucherGroups: VoucherTypeGroupModel[];
  // lstVoucherTypes: VoucherTypeSimpleModel[];

  // lstInputGroups: InputTypeGroupModel[];
  // lstInputTypes: InputTypeSimpleModel[];

  // lstPermission: RolePermission[];

  // lstModuleRolePermission: ModuleRolePermission[];

  // @Input() roleId: number;
  // @Output() done = new EventEmitter();
  // selected = 0;
  // constructor(
  //   private toast: ToastrService,
  //   private route: ActivatedRoute,
  //   router: Router,
  //   sessionService: SessionService,
  //   private roleservice: RoleService,
  //   private categoryService: CategoryService,
  //   private salesVoucherService: SalesVoucherService,
  //   private accountancyInputService: AccountancyInputService,
  //   private renderer: Renderer2,
  //   private store: Store<any>
  // ) {
  //   super(EnumModule.Role, EnumAction.Censor, router, sessionService);
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (!this.lstModule || !this.roleId) return;
  //   this.getRolePermission();
  // }


  // ngOnInit() {
  //   super.ngOnInit();
  //   this.selected = 0;
  //   forkJoin([
  //     this.sessionService.getModuleGroups(),
  //     this.sessionService.getModules(),
  //     this.categoryService.dynamicCates(this),
  //     this.salesVoucherService.searchVoucherGroup(this),
  //     this.salesVoucherService.vouchersTypeSimpleList(this),
  //     this.accountancyInputService.searchInputGroup(this),
  //     this.accountancyInputService.inputsTypeSimpleList(this)
  //   ]).pipe(
  //     map((result) => {
  //       let [groups, modules, cates, voucherGroups, voucherTypes, inputGroups, inputTypes] = result as any[];
  //       this.lstGroup = groups;
  //       this.lstModule = modules;
  //       this.lstCate = cates;
  //       this.lstVoucherGroups = voucherGroups;
  //       this.lstVoucherTypes = voucherTypes;

  //       this.lstInputGroups = inputGroups;
  //       this.lstInputTypes = inputTypes;

  //       this.combineModuleObject();
  //     })
  //   ).subscribe(r => {
  //     this.getRolePermission();
  //   });
  // }

  // getRolePermission() {
  //   if (!this.lstModule || !this.roleId) return;

  //   this.selected = 0;
  //   this.lstPermission = [];

  //   this.roleservice.getRolePermission(this, this.roleId)
  //     .subscribe(p => {
  //       this.lstPermission = p;
  //       this.bindPermission();
  //     })
  // }

  // findPermission(moduleId: number, objectTypeId?: number, objectId?: number): RolePermission {
  //   let modulePermission: RolePermission;
  //   if (objectTypeId && objectId) {
  //     modulePermission = this.lstPermission.find(x => x.moduleId === moduleId && x.objectTypeId == objectTypeId && x.objectId == objectId);
  //   } else {
  //     modulePermission = this.lstPermission.find(x => x.moduleId === moduleId);
  //   }
  //   if (!modulePermission) return null;
  //   return modulePermission;
  // }


  // checkPermission(permission: number, action: EnumAction) {
  //   return (permission & action) == action;
  // }

  // setIsAction(moduleRolePermission: ModuleRolePermission, rolePermission: RolePermission) {
  //   let permission = 0;
  //   if (rolePermission && rolePermission.permission) {
  //     permission = rolePermission.permission;
  //   }
  //   moduleRolePermission.isView = this.checkPermission(permission, EnumAction.View);
  //   moduleRolePermission.isAdd = this.checkPermission(permission, EnumAction.Add);
  //   moduleRolePermission.isUpdate = this.checkPermission(permission, EnumAction.Update);
  //   moduleRolePermission.isDelete = this.checkPermission(permission, EnumAction.Delete);
  //   moduleRolePermission.isCensor = this.checkPermission(permission, EnumAction.Censor);
  //   moduleRolePermission.isCheck = this.checkPermission(permission, EnumAction.Check);

  //   moduleRolePermission.isFull = this.isFull(moduleRolePermission);

  //   if (moduleRolePermission.actionObjects && rolePermission && rolePermission.actionIds) {
  //     moduleRolePermission.actionObjects.forEach(a => {
  //       if (rolePermission.actionIds.indexOf(a.id) >= 0) {
  //         a.isAllow = true;
  //       }
  //     })
  //   }
  //   // Object.keys(EnumAction).forEach(p => {
  //   //   if (!this.checkPermission(permission, EnumAction[p])) {
  //   //     moduleRolePermission.isFull = false;
  //   //   }
  //   // })
  // }

  // isFull(item: ModuleRolePermission) {
  //   let basic = item.isView && item.isAdd && item.isUpdate && item.isDelete && item.isCensor && item.isCheck;
  //   if (basic && item.actionObjects) {
  //     return !item.actionObjects.find(a => !a.isAllow);
  //   }
  //   return basic;
  // }

  // combineModuleObject() {
  //   this.lstModuleRolePermission = [];
  //   this.lstModule.forEach(m => {
  //     switch (m.moduleId) {
  //       case EnumModule.CategoryData:

  //         this.lstCate.forEach(cate => {
  //           let item = cloneDeep(m) as ModuleRolePermission;

  //           item.moduleName = cate.title;
  //           item.objectId = cate.categoryId;
  //           item.objectTypeId = EnumObjectType.Category;

  //           this.lstModuleRolePermission.push(item);
  //         })

  //         break;

  //       case EnumModule.Input:
  //         this.lstInputGroups.sort(g => g.sortOrder)
  //           .forEach(g => {

  //             let group = cloneDeep(m) as ModuleRolePermission;

  //             group.moduleName = g.inputTypeGroupName;
  //             group.isGroup = true;
  //             this.lstModuleRolePermission.push(group);

  //             this.lstInputTypes.filter(v => v.inputTypeGroupId == g.inputTypeGroupId).sort(v => v.sortOrder)
  //               .forEach(v => {
  //                 let item = cloneDeep(m) as ModuleRolePermission;

  //                 item.moduleName = v.title;
  //                 item.objectId = v.inputTypeId;
  //                 item.objectTypeId = EnumObjectType.InputType;
  //                 item.level = 1;

  //                 if (v.actionObjects) {
  //                   item.actionObjects = v.actionObjects.map(a => { return { id: a.inputActionId, title: a.title } as ModuleActionModel; })
  //                 }

  //                 this.lstModuleRolePermission.push(item);
  //               })

  //           })

  //         break;

  //       case EnumModule.SalesBill:
  //         this.lstVoucherGroups.sort(g => g.sortOrder)
  //           .forEach(g => {

  //             let group = cloneDeep(m) as ModuleRolePermission;

  //             group.moduleName = g.voucherTypeGroupName;
  //             group.isGroup = true;
  //             this.lstModuleRolePermission.push(group);

  //             this.lstVoucherTypes.filter(v => v.voucherTypeGroupId == g.voucherTypeGroupId).sort(v => v.sortOrder)
  //               .forEach(v => {
  //                 let item = cloneDeep(m) as ModuleRolePermission;

  //                 item.moduleName = v.title;
  //                 item.objectId = v.voucherTypeId;
  //                 item.objectTypeId = EnumObjectType.VoucherType;
  //                 item.level = 1;
  //                 if (v.actionObjects) {
  //                   item.actionObjects = v.actionObjects.map(a => { return { id: a.voucherActionId, title: a.title } as ModuleActionModel; })
  //                 }

  //                 this.lstModuleRolePermission.push(item);
  //               })

  //           })

  //         break;


  //       default:
  //         let item = cloneDeep(m) as ModuleRolePermission;

  //         this.lstModuleRolePermission.push(item);
  //     }
  //   });
  // }

  // bindPermission() {

  //   this.lstModuleRolePermission.forEach(item => {
  //     let p = this.findPermission(item.moduleId, item.objectTypeId, item.objectId);
  //     this.setIsAction(item, p);
  //   })

  //   this.done.next();
  // }


  // changeCheck(item) {
  //   item.isFull = this.isFull(item);
  // }

  // checkFull(item: ModuleRolePermission) {
  //   item.isView = item.isUpdate = item.isDelete = item.isCensor = item.isAdd = item.isCheck = item.isFull;
  //   if (item.actionObjects) {
  //     item.actionObjects.forEach(a => {
  //       a.isAllow = item.isFull;
  //     })
  //   }
  // }

  // checkAllGroup(g) {
  //   this.lstModuleRolePermission.forEach(item => {
  //     if (item.moduleGroupId === g.moduleGroupId) {
  //       item.isFull = g.isAll;
  //       this.checkFull(item)
  //     }
  //   });
  // }

  // update() {

  //   let data = this.getActionPayload({
  //     modules: this.lstModuleRolePermission,
  //     roleId: this.roleId
  //   });

  //   this.store.dispatch(updateRole(data))
  // }

  // select(i: any) {
  //   this.selected = i;
  // }


}
