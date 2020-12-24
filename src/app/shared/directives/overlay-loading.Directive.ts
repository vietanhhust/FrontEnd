import { Directive, HostListener, OnDestroy, OnInit, ElementRef, Renderer2, OnChanges, SimpleChanges, Input, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OverlayLoadingElmComponent } from '../components/overlay-loading-elm/overlay-loading-elm.component';

@Directive({
  selector: '[overlay-loading]'
})
export class OverlayLoadingDirective implements OnInit, OnChanges {

  loadingElm: HTMLElement;

  @Input() loading: boolean = false;

  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loading) {
      this.renderer.addClass(this.el.nativeElement, 'overlay-loading-wraper');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'overlay-loading-wraper');
    }
  }

  ngOnInit() {
    this.loadingElm = document.createElement('app-overlay-loading-elm');
    const factory = this.componentFactoryResolver.resolveComponentFactory(OverlayLoadingElmComponent);
    const componentRef = factory.create(this.injector, [], this.loadingElm);
    this.applicationRef.attachView(componentRef.hostView);

    this.el.nativeElement.appendChild(this.loadingElm);
  }
}