import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
// declare let $;
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  appLoadingElement: HTMLDivElement;
  renderer: Renderer2;
  states: boolean[] = [];
  state = false;
  stateChange: Subject<boolean> = new Subject<boolean>();
  constructor(rendererFactory: RendererFactory2) {
  // this.appLoadingElement = $('#app-loader');
  // this.renderer = rendererFactory.createRenderer(null, null);
  this.stateChange.subscribe((value) => {
    this.state = value;
});
  }


  checkState() {
    // if (!this.appLoadingElement) {
    //   return;
    // }
    // let checkstate = this.states.length ? 'removeClass' : 'addClass';
    if (this.states.length) {
    //  $('#app-loader').removeClass('hidden');
    this.stateChange.next(true);
    } else {
    this.stateChange.next(false);
   //   $('#app-loader').addClass('hidden');
    }
   // this.renderer[!this.states.length ? 'removeClass' : 'addClass'](document.body, 'lock-scroll');
  }

  show() {
   this.states.push(true);
   this.checkState();
  }

  hide() {
   this.states.shift();
   this.checkState();
  }
}
