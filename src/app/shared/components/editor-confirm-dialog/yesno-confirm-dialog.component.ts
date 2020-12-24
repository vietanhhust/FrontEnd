import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-editor-confirm-dialog',
  templateUrl: './yesno-confirm-dialog.component.html',
  styleUrls: ['./yesno-confirm-dialog.component.scss']
})
export class YesNoConfirmDialogComponent implements OnInit {
  listener: any
  data: any;
  isConfirm = true;
  constructor(private renderer: Renderer2) { }


  ngOnInit() {
    
  }

  confirm() {
    this.close.next('confirm');
  }

  denied(){
    this.close.next('denied');
  }
  @Output()
  close = new EventEmitter<string>();
}

export enum confirmType {
  confirm = 'confirm', 
  denied = 'denied', 
  
}