import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor() { }

  data: any;
  isConfirm = true;
  isIgnore = false;
  @Output() close = new EventEmitter();

  ngOnInit() {
    if (this.data.isIgnore) {
      this.isIgnore = true;
    }
  }
  Ignore() {
    this.close.next('Ignore');
  }
  confirm() {
    this.close.next(true);
  }
}
