
import { Directive, ElementRef, Input, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTransformForm]'
})
export class TransformFormDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.el.nativeElement.classList.add('dashboard-style');
  }
}
