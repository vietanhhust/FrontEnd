import { Directive, ElementRef, AfterViewInit, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';

declare var M, $: any;

@Directive({
  selector: '[tabs]'
})
export class TabsDirective implements AfterViewInit {

  ngAfterViewInit(): void {
setTimeout(() => {
  const te = $('li.tab').children('a');
  if (te && te.length > 0) {
    M.Tabs.init($('.tabs'), {});
  }
}, 333);

  }

  constructor(private elm: ElementRef) {

  }

}
