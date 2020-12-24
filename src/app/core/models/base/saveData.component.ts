import { Subject } from 'rxjs';
import { OnInit, OnDestroy, Directive, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { SessionService } from '../../services/base/session.service';
import { takeLast } from 'rxjs/operators';
import { FormCanDeactivate } from 'src/app/shared/guards/can-deactivate.guard';
import { Module, RolePermission } from '../system/role.model';
import { IXModuleContext } from './IXModuleContext';
import { ActionPayload } from 'src/app/shared/store/appstate';
import { cloneDeep } from 'lodash';
import { CheckPermissionUpdateDirective } from 'src/app/shared/directives/CheckPermission.Directive';
import { ToastMessageService } from '../../services/base/toastMessage.service';
import { CustomGenCodeOutputModel } from '../system/CustomGenCodeOutputModel';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class SaveDataComponent extends FormCanDeactivate implements OnInit, OnDestroy, IXModuleContext {
  self = this;

  protected unsubcribe$ = new Subject<void>();
  curentPermission: RolePermission;

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
  constructor(
    public moduleId: EnumModule,
    protected action: EnumAction,
    protected router: Router,
    protected sessionService: SessionService,
    public objectTypeId?: number,
    public objectId?: number
  ) {
    super();

  }

  ngOnInit() {
    this.findCurentPermission();

    if (!this.curentPermission) {
      this.router.navigate([`/error/access-denied`, this.moduleId], { queryParams: { ur: this.router.url } });
      this.ngOnDestroy();
    }
  }

  findCurentPermission() {
    let modulePermission: RolePermission;
    if (this.objectTypeId && this.objectId) {
      modulePermission = this.sessionService.permission.find(x => x.moduleId === this.moduleId && x.objectTypeId == this.objectTypeId && x.objectId == this.objectId);
    } else {
      modulePermission = this.sessionService.permission.find(x => x.moduleId === this.moduleId);
    }
    this.curentPermission = cloneDeep(modulePermission);
  }

  getActionPayload<T>(payload: T) {
    return { context: this.getContext(), payload: cloneDeep(payload) };
  }
  getContext(): IXModuleContext {
    return { moduleId: this.moduleId } as IXModuleContext;
  }

  customGenCode: CustomGenCodeOutputModel;
  loadCustomGenCode(targeObjectTypeId: EnumObjectType, configObjectTypeId?: EnumObjectType, configObjectId?: number, date?: number, code?: string) {
    configObjectTypeId = configObjectTypeId ? configObjectTypeId : targeObjectTypeId;
    configObjectId = configObjectId ? configObjectId : 0;
    this.sessionService.customGenCodeService.currentConfig(this, targeObjectTypeId, configObjectTypeId, configObjectId, null, code, date)
      .subscribe(c => {
        this.customGenCode = c;
      })
  }

  generateCodeAndConfirm(date: number, code?: string) {
    return this.sessionService.gencodeConfigService.generateCodeAndConfirm(this, this.customGenCode.customGenCodeId, this.customGenCode.lastValue, null, code, date);
  }

  getDash(n: number): string {
    let str = '';
    for (let i = 0; i < n; i++) {
      str += '⋅⋅⋅⋅⋅';
    }
    return str;
  }

  formValid(toast: ToastMessageService): boolean {
    if (this.form.valid) return true;

    for (let c in this.form.controls) {
      let errs = this.form.controls[c] ? this.form.controls[c].errors : null;
      if (errs) {
        let condition = null;
        for (let p in errs) {
          condition = p;
        }
        let elm = document.getElementsByName(c);
        if (elm && elm.length) {
          toast.error(`Vui lòng kiểm tra lại thông tin: ${elm[0].getAttribute('title')} ${c.substring(c.lastIndexOf('.') + 1)} is ${condition}`);
          return false;
        }
      }
    }

    toast.error(`Thông tin nhập không đúng. Vui lòng kiểm tra lại`);
    return false;

  }
}
