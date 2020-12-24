import { Directive, ElementRef, OnInit, Renderer2, Input, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appResizeTable]'
})
export class ResizeTableDirective implements AfterViewInit, OnDestroy {

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  grabber;
  oldX;
  resizeElem;
  width;
  @Input() resizeTable;
  table;
  tableWidth;
  lstListen: any;
  mouseMoveListener: () => void;
  mouseUpListner: () => void;
  ngAfterViewInit() {
      setTimeout(() => {
        if (this.element.nativeElement) {
          // tslint:disable-next-line: no-unused-expression
          this.table = this.element.nativeElement.parentNode.parentNode.parentNode;
          // this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
          this.renderer.addClass(this.element.nativeElement, 'noselect');
          this.width = this.element.nativeElement.clientWidth + 1;
          this.createResizeElement();
        }
      }, 999);
  }

  createResizeElement() {
    this.resizeElem = this.renderer.createElement('div');
    this.resizeElem.setAttribute('style',
      `width: 5px;
      position: absolute;
      height: 100%;
      top: 0px;
      right: 0px;
      transition: 0.2s;
      cursor: col-resize;
      z-index: 990;
      pointer-events: auto;
      box-shadow: inset -1px 0 0px 0 rgb(43 87 151 / 35%);`
    );
    this.renderer.appendChild(this.element.nativeElement, this.resizeElem);
    this.renderer.addClass(this.resizeElem, 'resized');
    this.setResizeElementMousedownLisener();
  }

  setResizeElementMousedownLisener() {
    this.lstListen = this.renderer.listen(this.resizeElem, 'mousedown', (event: MouseEvent) => {
      this.grabber = true;
      this.oldX = event.clientX;
      event.stopPropagation();
      this.mouseMoveElement();
      this.mouseUpElement();
    });
  }

  resizer(offsetX: number) {
    if (this.width < 51 && offsetX < 0) {
      this.width = 50;
    } else {
      this.width += offsetX;
      this.tableWidth = this.table.clientWidth;
      this.tableWidth += offsetX;
    }
    this.element.nativeElement.style.width = this.width + 'px';
    if (this.resizeTable) {
      this.table.style.width = this.tableWidth + 'px';
    }
  }

  mouseMoveElement() {
    this.mouseMoveListener = this.renderer.listen(window, 'mousemove', (event: MouseEvent) => {
      this.resizer(event.clientX - this.oldX);
      this.oldX = event.clientX;
    });
  }
  mouseUpElement() {
    this.mouseUpListner = this.renderer.listen(window, 'mouseup', (event: MouseEvent) => {
      if (this.mouseMoveListener) {
        this.mouseMoveListener();
      }
      if (this.mouseUpListner) {
        this.mouseUpListner();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.lstListen ) {
    this.lstListen();
    Object.keys(this.lstListen).forEach(item => {
      this.lstListen[item]();
    });
    Object.entries(this.lstListen).forEach(
      ([key, value]) => {
        this.lstListen[key]();
      });
    }

  }
}
