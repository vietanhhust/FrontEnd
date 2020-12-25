import { Component, OnInit, Input, Output  } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-app-actionmenu',
  templateUrl: './cms-actionmenu.component.html',
  styleUrls: ['./cms-actionmenu.component.scss']
})
export class CMSActionmenuComponent implements OnInit {
  @Input() value: any;
  @Input() lstEvent: any;
  // @Output('clickEvent') clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
}
