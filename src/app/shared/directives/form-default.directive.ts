import { Directive, ElementRef, Input, HostListener, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appFormDefault]'
})
export class FormDefaultDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.el.nativeElement.classList.add('header-style');
  }
}
