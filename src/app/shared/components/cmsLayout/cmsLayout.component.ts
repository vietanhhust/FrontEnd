import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
declare var $: any;
declare var M: any;
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/core/services/base/session.service';
import { takeLast, filter } from 'rxjs/operators';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

export let browserRefresh = true;

@Component({
  selector: 'app-cmslayout',
  templateUrl: './cmsLayout.component.html',
  styleUrls: ['./cmsLayout.component.scss']
})
export class CMSLayoutComponent implements OnInit, OnDestroy {
  @ViewChild(MenuComponent, { read: MenuComponent, static: true }) sidenav: MenuComponent;
  routerChangeDetector: Subscription;
  subscription: Subscription;
  constructor(private router: Router,
    //private sessionService: SessionService
  ) {

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }
  ngOnInit() {
    if (browserRefresh) {
      // this.sessionService
      //   .loadCurrentModulesPermissions()
      //   .pipe(takeLast(1))
      //   .subscribe(r => {
      //     if (r) {

      //     } else {
      //       this.sessionService.clear();
      //     }
      //   });
    }

    // Bắt sự kiện thay đổi url, để reset menu sidenav với những component cùng layout
    this.routerChangeDetector = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerChangeDetector.unsubscribe();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // M.Sidenav.init($('.sidenav'), {});
    // const sidebar = M.Sidenav.getInstance($('.sidenav'));
    // sidebar.close();
    // $('.sidenav-overlay').hide();
    $(document).ready(() => {
      M.AutoInit();
      M.Dropdown.init($('.dropdown-trigger2'), { hover: false, closeOnClick: true });
      M.Dropdown.init($('.dropdown-trigger'), { hover: false, closeOnClick: true });
      $('.tooltipped').tooltip();
      setTimeout(() => {
        $('.materselect').formSelect();
      }, 0);
    });
  }
}
