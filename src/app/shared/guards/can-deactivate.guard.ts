import { Injectable, HostListener, Directive } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      if (confirm('Bạn vẫn chưa lưu lại! Nếu bạn chuyển trang, những thay đổi vừa rồi sẽ mất.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}

@Directive()
export abstract class ComponentCanDeactivate {

  abstract canDeactivate(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      const dialogText = 'Changes that you made may not be saved..';
      $event.returnValue = dialogText;
    }
  }
}

@Directive()
export abstract class FormCanDeactivate extends ComponentCanDeactivate {
  abstract get form(): NgForm;
  canDeactivate(): boolean {
    return this.form.submitted || !this.form.dirty;
  }
}
