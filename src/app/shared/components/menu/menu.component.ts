import { Component, OnInit, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from 'src/app/core/services/base/session.service';
import { sortBy, cloneDeep } from 'lodash';
import { Store, select } from '@ngrx/store';
import { LoadMenuBegin } from '../header/store/header.actions';
import { MenuOutputModel } from 'src/app/core/models/system/businessinfo.model';
import { Module, RolePermission } from 'src/app/core/models/system/role.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare let $, M: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('expand', [
      state('normal', style({
        width: '300px'
      })),
      state('width', style({
        width: '500px'
      })),
      transition('normal => width', [animate('450ms ease-out')]),
      transition('width => normal', [animate('450ms ease-out')])
    ])
  ]
})
export class MenuComponent implements OnInit, AfterViewInit {
  user: any;
  lstPermission: RolePermission[];
  lstMenu: MenuOutputModel[] = [];
  recursiveList: any = [];

  @ViewChild('sidenav', {
    static: false,
    read: ElementRef
  }) sidenav: ElementRef
  constructor(
    private sessionService: SessionService,
    private menuInfoStore: Store<{ menuInfo: any }>, private render: Renderer2) {
    this.menuInfoStore.dispatch(new LoadMenuBegin());
  }

  ngAfterViewInit(): void {
    this.getMenu();
  }

  ngOnInit() {
    this.user = this.sessionService.user;
    this.lstPermission = this.sessionService.permission;
    if (this.lstPermission.length < 1) {
      return;
    }

  }

  getMenu() {
    this.menuInfoStore.pipe(select('menuInfo')).subscribe(data => {
      if (data && data.items && Array.isArray(data.items)) {
        this.transferMenu(data.items);
      }
    });

  }

  transferMenu(data) {
    const $this = this;
    this.recursiveList = [];
    this.lstMenu = cloneDeep(data);
    this.lstMenu = sortBy(this.lstMenu, ['sortOrder']);

    //Tạo điểm neo ( toàn có father ==0)
    this.recursiveList = this.lstMenu.filter(x => x.parentId === 0);
    this.recursiveList.forEach(item => {
      this.getTreeMenu(item, 0);
    })

    setTimeout(() => {
      let collapsibleItems = document.querySelectorAll('.collapsible');
      collapsibleItems.forEach(item => {
        M.Collapsible.init(item, {});
      })
      this.initOpenMenu();
    })
  }

  getCurentPermission(id) {
    if (this.sessionService.permission.filter(x => x.moduleId === id)[0]) {
      return this.sessionService.permission.filter(x => x.moduleId === id)[0].isView;
    }
  }
  parseJson(obj) {
    try {
      JSON.parse(obj);
    } catch (e) {
      return false;
    }
    return JSON.parse(obj);
  }

  getTreeMenu(node: any, level: number) {

    // xử lý với trường param
    (node.param && node.param !== undefined) ?
      node.param = this.parseJson(node.param.toString().replace(/'/g, '"')) :
      node.param = node.param;

    // ghi lại level của menu;
    node.level = level;
    level++;

    // quyền show của node menu
    const selecPermission = this.lstPermission.find(z => z.moduleId === node.moduleId && (!node.objectTypeId || node.objectTypeId == z.objectTypeId && node.objectId == z.objectId));
    if (!node.moduleId || selecPermission) {
      node.isShow = true;
    } else {
      node.isShow = false;
    }

    node.child = this.lstMenu.filter(item => item.parentId === node.menuId);
    if (node.child.length > 0) {
      node.child.forEach(item => {
        this.getTreeMenu(item, level)
      })
    }

    if (node.child && node.child.length) {

      node.child = node.child.filter(c => c.isShow);

      if (node.child && node.child.length) {
        node.isShow = true;
      } else {
        node.isShow = false;
      }
    } else {
      if (!node.url || node.url.length < 4)
        node.isShow = false;
    }

    if (node.isDisabled) {
      node.isShow = false;
    }
  }

  initOpenMenu() {
    //reset collapsible && active li.
    let lis = document.querySelectorAll('.menu_li');
    let collapsibles = document.querySelectorAll('.collapsible-body')

    lis.forEach(item => {
      this.render.removeClass(item, 'active');
    })
    collapsibles.forEach(item => {
      this.render.setStyle(item, 'display', 'none');
    })

    let active_a = document.querySelector('.active-a');
    let li_closest = $(active_a).parent().parent();
    li_closest.toggleClass('active');
    let collapsible_div_closest = li_closest.parent().parent().parent().parent();
    collapsible_div_closest.css('display', 'block');
    let li_current = li_closest;
    let div_current = collapsible_div_closest;

    for (let i = 0; i < 12; i++) {
      try {
        li_current = div_current.parent();
        li_current.toggleClass('active');
        div_current = li_current.parent().parent().parent().parent();
        div_current.css('display', 'block');
      } catch {
      }
    }
  }

  states = 'normal';
  expandMenu() {
    this.states == 'normal' ? this.states = 'width' : this.states = 'normal'
  }

}
