import { Directive, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/base/loader.service';

@Directive({
  selector: '.btn-add, .btn-update, .btn-view, .btn-censor, .btn-delete, .btn-debounce'
})
export class DebounceClickDirective implements OnInit {
  private clicks = new Subject();
 // private subscription: Subscription;
  checkclick = true;
  constructor(private el: ElementRef, private renderer: Renderer2, private _loaderService: LoaderService) { }

  ngOnInit() {
    // this.subscription = this.clicks.pipe(
    //     debounceTime(1000)
    // ).subscribe(e => {
    //     this.setStyle(true);
    //     this._loaderService.checkState();
    //     if (!this._loaderService.state) {
    //       this.checkclick = true;
    //     }
    // });
  }
  setStyle(c) {
    if (c) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.renderer.removeClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fas');
      this.renderer.removeClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fa-spinner');
      this.renderer.removeClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fa-spin');
      this.renderer.setStyle(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'height',
      this.el.nativeElement.localName === 'a' ? '15px' : '');
      this.renderer.setStyle(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'line-height',
      this.el.nativeElement.localName === 'a' ? '15px' : '');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.7');
      this.renderer.addClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fas');
      this.renderer.addClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fa-spinner');
      this.renderer.addClass(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'fa-spin');
      this.renderer.setStyle(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'line-height',
      this.el.nativeElement.localName === 'a' ? '15px' : '');
      this.renderer.setStyle(this.el.nativeElement.children[0] ? this.el.nativeElement.children[0] : this.el.nativeElement, 'height',
      this.el.nativeElement.localName === 'a' ? '15px' : '');
    }
  }


  @HostListener('click', ['$event'])
  clickEvent(event) {
    this.setStyle(false);
    const int = setInterval(() => {
      this._loaderService.checkState();
      this.setStyle(false);
      if (!this._loaderService.state) {
        clearInterval(int);
        setTimeout(() => {
          this.setStyle(true);
        }, 600);
      }
    }, 600);

    this.clicks.next(event);
  }

}
