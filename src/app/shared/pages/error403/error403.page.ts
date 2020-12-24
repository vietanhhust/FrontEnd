import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Router, NavigationEnd, ROUTES, ActivatedRoute } from '@angular/router';
import { pageList } from 'src/app/common/config/statics';
import { filter } from 'rxjs/operators';
import { PageTitleService } from './../../../core/services/base/page-title.service';
@Component({
  selector: 'app-error403',
  templateUrl: './error403.page.html',
  styleUrls: ['./error403.page.scss'],
  providers: []
})

export class Error403Page {
  ur: string
  constructor(private route: Router, private activedRoute: ActivatedRoute) {
    activedRoute.queryParams.subscribe((params) => {
      this.ur = params['ur'];
    });
  }

}
