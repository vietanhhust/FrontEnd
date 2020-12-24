import { OnInit, OnChanges, Renderer2, Injectable } from '@angular/core';
import { PopupComponent } from '../components/popup/popup.component';
@Injectable({
    providedIn: 'root'
})
export class PopupCountService {
    constructor() {

    }

    //static guidId: number = 0;
    // static guidIds: number[] = [];
    static popups: PopupComponent[] = []
    static removePopup(popup: PopupComponent) {
        let idx = PopupCountService.popups.findIndex(p => p == popup);
        if (idx > 0) {
            PopupCountService.removeUnhandlerPopup();
            PopupCountService.popups.splice(idx, 1);
        }
    }

    static removeUnhandlerPopup() {
        while (!PopupCountService.popups[PopupCountService.popups.length - 1]) {
            PopupCountService.popups.pop();
        }
    }
    static popPopup(): PopupComponent {
        if (PopupCountService.popups && PopupCountService.popups.length > 0) {
            let popup = PopupCountService.popups[PopupCountService.popups.length - 1];
            if (!popup) {
                PopupCountService.removeUnhandlerPopup();
                return;
            }

            if (!popup.isEditor) {
                popup.close();
            }
            return popup;
        }
        return null;
    }
}

