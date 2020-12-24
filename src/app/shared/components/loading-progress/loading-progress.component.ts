import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, EventEmitter, Output, ViewContainerRef, ComponentRef, Input } from '@angular/core';
@Component({
  selector: 'app-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss']
})
export class LoadingProgressComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('modalprog', {static: true}) modal: ElementRef;
  @Output() closed = new EventEmitter();
  @Input() data: any;
  constructor(
    public viewContainerRef: ViewContainerRef) { }
    public componentRef: ComponentRef<any>;

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
