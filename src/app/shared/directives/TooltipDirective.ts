import {Directive, Renderer2, ElementRef, Input, OnInit} from '@angular/core';
declare let M: any;
@Directive({
    selector: '[sharedtooltip]'
})
export class CustomTooltipDirective implements OnInit {
    @Input() sharedtooltip;
    @Input() href;
    constructor(private renderer2: Renderer2, private elf: ElementRef) {

    }
    ngOnInit() {
        // create i
        const info = this.renderer2.createElement('i');

        this.renderer2.addClass(info,'fas');
        this.renderer2.addClass(info, 'fa-info-circle');
        this.renderer2.addClass(info, 'tooltipped');
        this.renderer2.setAttribute(info, 'data-position','top');
        this.renderer2.setStyle(info, 'margin-left', '5px');
        this.renderer2.setStyle(info, 'color', '#a0a0a0');
        this.renderer2.setAttribute(info, 'data-tooltip', this.sharedtooltip);

        // create a
        if (this.href != null) {
        const link = this.renderer2.createElement('a');
        this.renderer2.setProperty(link, 'href', this.href);
        this.renderer2.appendChild(link, info);
        this.renderer2.appendChild(this.elf.nativeElement, link);
        } else {
            this.renderer2.appendChild(this.elf.nativeElement, info);
        }
        const elems = document.querySelectorAll('.tooltipped');
        const instances = M.Tooltip.init(elems, {});
        if (!this.sharedtooltip) {
          this.renderer2.setStyle(info, 'display', 'none');
        }
    }
}
