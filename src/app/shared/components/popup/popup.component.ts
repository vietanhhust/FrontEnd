import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { clone } from 'src/app/common/helpers/getter.helper';
import { AnchorDirective } from '../../directives/AnchorDirective';
import { PopupCountService } from '../../services/popupCount.service';
import { EditorComponent } from 'src/app/shared/components/editor/editor.component';
import { confirmType } from '../editor-confirm-dialog/yesno-confirm-dialog.component';
declare var $: any;

@Component({
  template: `
  <div #modal [ngClass]="cssClass" >
    <div anchor-host></div>
  <div>
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, AfterViewInit {
  background: any;
  sender: any;
  elm: any;
  component: any;
  cssClass: any = {
    'modal': true,
    'modal-fixed-footer': true
  };
  embededComponent: ComponentFactory<any>;
  data: any;
  result: any;
  isEditor: boolean = false;
  isConfirm: boolean = false;
  @Output() closed = new EventEmitter();
  @ViewChild('modal', { static: false }) modal: ElementRef;
  @ViewChild(AnchorDirective, { static: false }) anchorHost: AnchorDirective;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {

  }

  embededInstance: any;

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const viewContainerRef = this.anchorHost.viewContainerRef;

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.embededComponent);
    this.embededInstance = componentRef.instance;
    componentRef.instance.data = this.data;
    if (this.sender) {
      componentRef.instance.moduleId = this.sender.moduleId;
    }

    componentRef.instance.sender = this.sender;

    if (componentRef.instance.isEditor) {
      this.isEditor = true;
    }
    if (componentRef.instance.isConfirm) {
      this.isConfirm = true;
    }
    if (componentRef.instance.close) {
      componentRef.instance.close.subscribe((result) => {
        this.result = result;
        this.close();


      });
    }
    this.elm = $(this.modal.nativeElement);
    let $this = this;

    $(this.elm).modal({
      complete: function () {
      },
      onCloseEnd: function () {
        PopupCountService.removePopup($this);
        $this.closed.next($this.result);
        try {
          componentRef.destroy();
        } catch (e) {
          console.error(e);
        }
      },
      onCloseStart: function () {
      },
      dismissible: false
    });
    $(this.elm).modal('open');
    PopupCountService.popups.push(this);
    componentRef.changeDetectorRef.detectChanges();

    $('.modal-overlay', this.background).click((e) => {
      $this.close();
    })

  }

  @Input()
  public setComponent(compnent: any, data?: any, cssClass?: string[], elm?: any) {
    this.component = compnent;
    this.background = elm;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(compnent);
    this.data = data;
    if (cssClass) {
      cssClass.forEach(cl => {
        this.cssClass[cl] = true;
      })
    }

    this.embededComponent = componentFactory;
  }

  @Input()
  public close() {
    $(this.elm).modal('close');
    //this.closed.next(this.result);
  }
}

