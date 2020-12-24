import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig, ActiveToast } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  defaultConfig: Partial<IndividualConfig> = {
    timeOut: 4000,
    extendedTimeOut: 500,
    positionClass: `toast-bottom-left`,
    progressBar: true,
    progressAnimation: 'decreasing'
  };

  constructor(
    protected toastr: ToastrService
  ) {
    toastr.toastrConfig.maxOpened = 2;
    toastr.toastrConfig.autoDismiss = true;
  }

  private normalizeConfig(override?: Partial<IndividualConfig>) {
    if (!override) {
      override = {}
    }

    Object.assign(override, this.defaultConfig);

    return override;
  }
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    override = this.normalizeConfig(override);
    Object.assign(override, this.defaultConfig);

    return this.toastr.show(message, title, override, type);
  }

  success(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    override = this.normalizeConfig(override);
    return this.toastr.success(message, title, override);
  }

  error(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    override = this.normalizeConfig(override);
    override.timeOut = 7000;
    return this.toastr.error(message, title, override);
  }

  /**
  * Hiện thông báo dạng thông tin
  */
  info(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    override = this.normalizeConfig(override);
    return this.toastr.info(message, title, override);
  }

  warning(message?: string, title?: string, override?: Partial<IndividualConfig>): ActiveToast<any> {
    override = this.normalizeConfig(override);
    return this.toastr.warning(message, title, override);
  }

  clear(toastId?: number): void {
    this.toastr.clear(toastId);
  }

  remove(toastId: number): boolean {
    return this.toastr.remove(toastId);
  }
}
