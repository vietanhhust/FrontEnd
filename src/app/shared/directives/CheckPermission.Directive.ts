
import { Directive, ElementRef, Renderer2, OnInit, Optional, forwardRef, Input, AfterViewChecked } from '@angular/core';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { IXModuleContext } from 'src/app/core/models/base/IXModuleContext';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { Module, RolePermission } from 'src/app/core/models/system/role.model';
import { SessionService } from 'src/app/core/services/base/session.service';

const style = 'display';
const property = 'none';

@Directive()
abstract class CheckPermissionDirectiveAbstract {
  curentPermission: RolePermission;
  private moduleId: number;

  @Input('module-object-type') objectTypeId: number;
  @Input('module-object-id') objectId: number;

  constructor(
    protected action: EnumAction
    , protected el: ElementRef
    , protected renderer: Renderer2
    , protected sessionService: SessionService
  ) {

  }

  getModule() {
    return this.moduleId;
  }

  setModule(module: BaseComponent | SaveDataComponent | number) {
    if (module) {
      if (typeof (module) == 'number') {
        this.moduleId = module;
      } else {
        this.moduleId = module.moduleId;
        this.objectTypeId = module.objectTypeId;
        this.objectId = module.objectId;
        this.curentPermission = module.curentPermission;
      }
    }

    this.findCurrentPermission();
    this.hiddenByPermission();
  }


  private hiddenByPermission() {
    //console.log('hiddenByPermission '+this.moduleId + ' '+this.action,this.curentPermission )
    if (this.moduleId && this.curentPermission && (this.curentPermission.permission & this.action) != this.action && this.el && this.el.nativeElement) {
      this.renderer.setStyle(this.el.nativeElement, style, property);
    }
  }

  private findCurrentPermission() {
    if (!this.curentPermission) {
      this.curentPermission = this.sessionService.permission.find(x => x.moduleId === (this.moduleId ? this.moduleId : this.sessionService.moduleId));
    }

  }

}

@Directive({
  selector: '.btn-add, [check-add]'
})
export class CheckPermissionAddDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {
  @Input('check-add') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.Add, el, renderer, sessionService);
  }

  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}

@Directive({
  selector: '.btn-update, [check-update]',
})
export class CheckPermissionUpdateDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {
  @Input('check-update') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.Update, el, renderer, sessionService);

  }


  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}

@Directive({
  selector: '.btn-delete, [check-delete]'
})
export class CheckPermissionDeleteDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {

  @Input('check-delete') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.Delete, el, renderer, sessionService);
  }


  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}

@Directive({
  selector: '.btn-view, [check-view]'
})
export class CheckPermissionViewDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {
  @Input('check-view') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.View, el, renderer, sessionService);
  }

  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}

@Directive({
  selector: '.btn-censor, [check-censor]'
})
export class CheckPermissionCensorDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {
  @Input('check-censor') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.Censor, el, renderer, sessionService);
  }

  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}

@Directive({
  selector: '.btn-check, [check-isCheck]'
})
export class CheckPermissionIsCheckDirective extends CheckPermissionDirectiveAbstract implements AfterViewChecked {
  @Input('check-isCheck') parentCmp: BaseComponent | SaveDataComponent | number;

  constructor(el: ElementRef, renderer: Renderer2, sessionService: SessionService) {
    super(EnumAction.Check, el, renderer, sessionService);
  }

  ngAfterViewChecked() {
    super.setModule(this.parentCmp);
  }
}
