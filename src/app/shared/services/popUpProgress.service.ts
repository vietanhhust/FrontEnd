import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { LoadingProgressComponent } from '../components/loading-progress/loading-progress.component';
declare let $;
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line: class-name
export class popUpProgressService {
  dialogComponentRef: ComponentRef<LoadingProgressComponent>;
  elm: any;
  constructor(private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }
  appendDialogComponentToBody() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingProgressComponent);
    const componentRef = componentFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;
  }
   removeDialogComponentFromBody() {
    this.applicationRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
  public open() {
    this.appendDialogComponentToBody();
    this.elm = $(this.dialogComponentRef.instance.modal.nativeElement);
    $(this.elm).modal({
      complete: function () {
      },
      onCloseStart: function () {
      }
    });
    $(this.elm).modal('open');
}
public close() {
  this.removeDialogComponentFromBody();
  $(this.elm).modal('close');
  $('#progr').text('Đang xử lý');
}
updateProgress(begin, end) {
  $('#progr').text('Đang xử lý ' + begin + '/' + end);
}
}
