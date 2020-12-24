import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { EnumAction, EnumModule } from 'src/app/common/constants/global/Enums';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'subsidiary-view',
  templateUrl: './subsidiary-view.component.html',
  styleUrls: ['./subsidiary-view.component.scss']
})
export class SubsidiaryViewComponent extends BaseComponent implements OnInit {

  constructor(sessionService: SessionService, router: Router) { 
    super(EnumModule.Subsidiaries, EnumAction.View, router, sessionService)
  }

  @Input() data : any; 
  isView = true; 
  isShowPage=true; 
  ngOnInit() {
    super.ngOnInit(); 

  }

}
