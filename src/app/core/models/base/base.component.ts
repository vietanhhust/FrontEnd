import { Subject } from 'rxjs';
import { OnInit, OnDestroy, Directive, ViewChildren, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { SessionService } from '../../services/base/session.service';
import { takeLast } from 'rxjs/operators';
import { Module, RolePermission } from '../system/role.model';
import { IXModuleContext } from './IXModuleContext';
import { ActionPayload } from 'src/app/shared/store/appstate';
import { cloneDeep } from 'lodash';
import { CheckPermissionAddDirective, CheckPermissionCensorDirective, CheckPermissionDeleteDirective, CheckPermissionIsCheckDirective, CheckPermissionUpdateDirective, CheckPermissionViewDirective } from 'src/app/shared/directives/CheckPermission.Directive';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { CustomGenCodeOutputModel } from '../system/CustomGenCodeOutputModel';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy, IXModuleContext, AfterViewChecked {

    self = this;

    @ViewChild(CheckPermissionAddDirective, { static: false })
    checkPermissionAdd: CheckPermissionAddDirective;

    @ViewChild(CheckPermissionUpdateDirective, { static: false })
    checkPermissionUpdate: CheckPermissionUpdateDirective;

    @ViewChild(CheckPermissionDeleteDirective, { static: false })
    checkPermissionDelete: CheckPermissionDeleteDirective;

    @ViewChild(CheckPermissionViewDirective, { static: false })
    checkPermissionView: CheckPermissionViewDirective;

    @ViewChild(CheckPermissionCensorDirective, { static: false })
    checkPermissionCensor: CheckPermissionCensorDirective;

    @ViewChild(CheckPermissionIsCheckDirective, { static: false })
    checkPermissionCheck: CheckPermissionIsCheckDirective;


    constructor(
        public moduleId: EnumModule,
        protected action: EnumAction,
        protected router: Router,
        protected sessionService: SessionService,
        public objectTypeId?: number,
        public objectId?: number
    ) {
        

      
    }
    ngAfterViewChecked(): void {
        if (this.checkPermissionAdd && !this.checkPermissionAdd.getModule()) {
            this.checkPermissionAdd.setModule(this.moduleId);
        }

        if (this.checkPermissionUpdate && !this.checkPermissionUpdate.getModule()) {
            this.checkPermissionUpdate.setModule(this.moduleId);
        }

        if (this.checkPermissionDelete && !this.checkPermissionDelete.getModule()) {
            this.checkPermissionDelete.setModule(this.moduleId);
        }

        if (this.checkPermissionView && !this.checkPermissionView.getModule()) {
            this.checkPermissionView.setModule(this.moduleId);
        }


        if (this.checkPermissionCensor && !this.checkPermissionCensor.getModule()) {

            this.checkPermissionCensor.setModule(this.moduleId);
        }

        if (this.checkPermissionCheck && !this.checkPermissionCheck.getModule()) {
            this.checkPermissionCheck.setModule(this.moduleId);
        }
    }

    protected unsubcribe$ = new Subject<void>();

    curentPermission: RolePermission;
    ngOnDestroy(): void {
        this.unsubcribe$.next();
        this.unsubcribe$.complete();
    }

    protected EnumModule = EnumModule;

    ngOnInit() {

        this.findCurentPermission();
        
        if (!this.curentPermission) {
            this.router.navigate([`/error/access-denied`, this.moduleId], { queryParams: { ur: this.router.url } });
            this.ngOnDestroy();
        }

    }

    setObjectData(objectTypeId: number, objectId: number) {
        this.objectTypeId = objectTypeId;
        this.objectId = objectId;
        this.findCurentPermission();
    }

    findCurentPermission() {
        let modulePermission;
        if (this.objectTypeId && this.objectId) {
            modulePermission = this.sessionService.permission.find(x => x.moduleId === this.moduleId && x.objectTypeId == this.objectTypeId && x.objectId == this.objectId);
        } else {
            modulePermission = this.sessionService.permission.find(x => x.moduleId === this.moduleId);
        }
        this.curentPermission = cloneDeep(modulePermission);
        this.sessionService.moduleId = this.moduleId;
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

    generateCodeAndConfirm(date: number | string, code?: string) {
        return this.sessionService.gencodeConfigService.generateCodeAndConfirm(this, this.customGenCode.customGenCodeId, this.customGenCode.lastValue, null, code, date);
    }
    getDash(n: number): string {
        let str = '';
        for (let i = 0; i < n; i++) {
            str += '----';
        }
        return str;
    }
}
