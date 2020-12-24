import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { confirmType } from './shared/components/editor-confirm-dialog/yesno-confirm-dialog.component';
import { PopupCountService } from './shared/services/popupCount.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'VERP-Web';

  listeners: {
    [key: string]: any;
  } = {};
  constructor(private renderer: Renderer2) {
  }
  ngOnInit(): void {

    this.listeners['enter'] = this.renderer.listen('body', 'keyup.enter', (e) => {
      if (PopupCountService.popups && PopupCountService.popups.length > 0) {
        let popup = PopupCountService.popups[PopupCountService.popups.length - 1];
        if (popup.isConfirm) {
          popup.result = confirmType.confirm;
          popup.close();
        }
      }
    })

    this.listeners['escape'] = this.renderer.listen('body', 'keyup.escape', (e) => {
      PopupCountService.popPopup();
    })
  }
}
