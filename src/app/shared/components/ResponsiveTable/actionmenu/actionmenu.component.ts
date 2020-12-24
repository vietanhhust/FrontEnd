import { Component, OnInit, Input, Output  } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actionmenu',
  templateUrl: './actionmenu.component.html',
  styleUrls: ['./actionmenu.component.scss']
})
export class ActionmenuComponent implements OnInit {
  @Input() value: any;
  @Input() lstEvent: any;
  // @Output('clickEvent') clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
}
