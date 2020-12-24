import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ViewRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { PopupComponent } from '../components/popup/popup.component';
import { PopupCountService } from 'src/app/shared/services/popupCount.service'
import { DialogModel } from 'src/app/core/models/base/DialogModel';
import { IXModuleContext } from 'src/app/core/models/base/IXModuleContext';
import { YesNoConfirmDialogComponent } from '../components/editor-confirm-dialog/yesno-confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }
  static lstPopups: any[] = [];

  alert(message: string, title?: string, cssClass?: any): Observable<null> {
    if (!title) {
      title = `Thông báo`;
    }
    if (!cssClass) {
      cssClass = ['wmedium', 'hsmall']
    }
    return new Observable<null>((ob) => {
      this.open(ConfirmDialogComponent, { title, message, isConfirm: false }, function confirmClosed() {
        ob.next();
        ob.complete();
      }, cssClass);
    });

  }
  // callback?: (ok: boolean) => void, cssClass?: any
  confirm(message: string, title?: string, cssClass?: any, okText?: any,): Observable<boolean> {
    if (!title) {
      title = `Thông báo`;
    }
    if (!cssClass) {
      cssClass = ['wmedium', 'hsmall']
    }
    return new Observable<boolean>((ob) => {
      this.open(ConfirmDialogComponent, { title, message, isConfirm: true, okText }, function confirmClosed(ok: boolean) {
        ob.next(ok);
        ob.complete();
      }, cssClass);
    });
  }

  confirmWithIgnore(message: string, title?: string, cssClass?: any, okText?: any): Observable<any> {
    if (!title) {
      title = `Thông báo`;
    }
    if (!cssClass) {
      cssClass = ['wmedium', 'hsmall']
    }
    return new Observable<boolean>((ob) => {
      this.open(ConfirmDialogComponent, { title, message, isConfirm: true, okText, isIgnore: true }, function confirmClosed(ok: boolean) {
        ob.next(ok);
        ob.complete();
      }, cssClass);
    });
  }


  /**
   * Show modal popup front of page
   * @param component: The componet will be displayed
   * @param data : The data of data property of the component
   * @param callback: The callback function after the popup closed
   * @param cssClass: Css class of popup (modal-fullscreen, wmsmall,wmedium,wmediumPlus,wlarge,wmlarge,hlarge,hxlarge,hxxlarge)
   * @param elm: The element which the popup will be appended to
   */
  open(component: any, data: any, callback?: Function, cssClass?: string[], elm?: any): DialogModel {
    return this.openBase(null, component, data, callback, cssClass, elm)
  }

  openV2(sender: IXModuleContext, component: any, data: any, callback?: Function, cssClass?: string[]) {
    return this.openBase(sender, component, data, callback, cssClass, null)
  }

  openBase(sender: IXModuleContext, component: any, data: any, callback?: Function, cssClass?: string[], elm?: any): DialogModel {
    const popup = document.createElement('popup-component');
    const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);


    this.applicationRef.attachView(popupComponentRef.hostView);

    if (!elm) { elm = document.body; }

    popupComponentRef.instance.closed
      .subscribe((result) => {
        console.log('result', result)
        if (callback) {
          callback(result);
        }
        elm.removeChild(popup);
        this.applicationRef.detachView(popupComponentRef.hostView);
        PopupCountService.removePopup(popupComponentRef.instance);
      });

    popupComponentRef.instance.sender = sender;
    popupComponentRef.instance.setComponent(component, data, cssClass, popup);

    elm.appendChild(popup);

    return {
      popup: popupComponentRef.instance,
      close: function () {
        return popupComponentRef.instance.close();
      }
    } as DialogModel;
  }


  yesNoConfirm(message: string, title?: string, cssClass?: any, okText?: any, deniedText?: string): Observable<string> {
    if (!title) {
      title = `Thông báo`;
    }
    if (!cssClass) {
      cssClass = ['wmedium', 'hsmall']
    }

    return new Observable<string>((ob) => {
      //const id = this.identity++;
      //PopupCountService.listPopId.push(id);
      this.open(YesNoConfirmDialogComponent, { title, message, isYesNoConfirm: true, okText, deniedText: deniedText }, function confirmClosed(ok: string) {
        ob.next(ok);
        ob.complete();
        //PopupService.lstPopups.pop();
      }, cssClass);
    });


  }
}
