import { Directive, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      const close = $(this.elm.nativeElement).attr('closeOnClick');
      $(this.elm.nativeElement).dropdown({
        alignment: 'right',
        coverTrigger: false,
        closeOnClick: (close && close !== undefined) ? false : true,
        hover: $(this.elm.nativeElement).attr('hover'),
        onOpenStart: function (elm) {
          $(elm).addClass('opened');
        },
        onCloseStart: function (elm) {
          $(elm).removeClass('opened');
        }
      });
    }, 500);
  }

  constructor(private elm: ElementRef) {

  }

}
