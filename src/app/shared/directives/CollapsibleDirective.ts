import { Directive, HostListener, OnInit, ElementRef, Renderer2, Input, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/base/loader.service';

declare let M: any;
@Directive({
    selector: '[collapsible]'
})
export class CollapsibleDirective implements OnInit, AfterViewInit {

    constructor(private el: ElementRef, private renderer: Renderer2, private _loaderService: LoaderService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            let collapsibleItems = document.querySelectorAll('.collapsible');
            collapsibleItems.forEach(item => {
                M.Collapsible.init(item, {});
            })
        })
    }

}
