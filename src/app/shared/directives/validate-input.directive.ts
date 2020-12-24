import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appValidateInput]'
})
export class ValidateInputDirective {

  @Input()
  frm:any
  constructor(private elementRef:ElementRef) {


   }

}
