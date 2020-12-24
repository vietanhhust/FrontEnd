import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';

@Component({
  selector: 'shortcut-hint',
  templateUrl: './shortcut-hint.component.html',
  styleUrls: ['./shortcut-hint.component.scss']
})
export class ShortcutHintComponent implements OnInit, IModalComponent {

  @Input() data; 
  @Output() close = new EventEmitter(); 
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
