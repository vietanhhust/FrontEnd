import { Directive, ElementRef, HostListener } from '@angular/core';
declare var $: any;

@Directive({
  selector: 'table input'
})
export class FocusInputDirective {

  @HostListener('focus', ['$event'])
  onfocus() {
    setTimeout(() => {
        if (typeof this.elm.nativeElement.selectionStart === 'number') {
            this.elm.nativeElement.selectionStart = this.elm.nativeElement.selectionEnd = this.elm.nativeElement.value.length;
        } else if (typeof this.elm.nativeElement.createTextRange !== 'undefined') {
            this.elm.nativeElement.focus();
            const range = this.elm.nativeElement.createTextRange();
            range.collapse(false);
            range.select();
        }
    }, 1);
  }
  constructor(private elm: ElementRef) {

  }

}
