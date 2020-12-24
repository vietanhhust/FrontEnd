import { Directive, AfterViewInit, ElementRef, AfterContentChecked, AfterViewChecked, AfterContentInit, NgZone, OnInit, OnChanges, DoCheck, Input, HostListener, SimpleChanges } from '@angular/core';

declare var M: any;

@Directive({
  selector: '[select-control]'
})
export class SelectControlDirective implements OnChanges, AfterViewChecked {
  @Input() disabled;
  @Input() selected;

  timeout: any

  ngAfterViewChecked(): void {
    if (this.isDataChanged) {
      this.isDataChanged = false;
      if (this.instance) {
        try {
          this.instance.destroy();
        } catch (error) {

        }

      }
      let options = {

      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.elm.nativeElement) {
          this.instance = M.FormSelect.init(this.elm.nativeElement, options);
        }
      }, 200);
    }
  }


  @Input()
  data: any;
  instance: any;
  isDataChanged: boolean;
  constructor(private elm: ElementRef, private zone: NgZone) {

  }


  @HostListener('change')
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes && changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      this.isDataChanged = true;
    }

    if (changes && changes['disabled'] && changes['disabled'].previousValue != changes['disabled'].currentValue) {
      this.isDataChanged = true;
    }
    
    if (changes && changes['selected'] && changes['selected'].previousValue != changes['selected'].currentValue) {
      this.isDataChanged = true;
    }

  }


}
