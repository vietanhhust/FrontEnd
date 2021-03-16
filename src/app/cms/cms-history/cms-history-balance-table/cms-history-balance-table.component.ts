import { Component, OnInit, Input, Renderer2, Output, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AppConfig } from 'src/app/common/config/app.config';
declare let $: any;

export enum EnumTableDisplayType {

}

@Component({
  selector: 'cms-history-balance-table',
  templateUrl: './cms-history-balance-table.component.html',
  styleUrls: ['./cms-history-balance-table.component.scss']
})
export class CMSHistoryBalanceTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: any[];
  @Input() configTable: any;
  @Input() id: string;
  @Input() totalData: any;
  total: number;
  pageindex = 1;
  limit: number = AppConfig.generate.pagesize;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  currentValue: any;
  @Output() selectedValue = new EventEmitter<any>();
  @Output() checkedValue = new EventEmitter<any>();
  @Output() DoubleClickValue = new EventEmitter<any>();
  @Output() selectedTd?= new EventEmitter<any>();
  itemchecked: boolean;
  valueCheckbox: any;

  @Input() reverseSort = false;
  checkClick: boolean;
  lastChecked = null;
  @Input() searchText: String;
  // tslint:disable-next-line: no-output-rename
  // @Output('changePage') changePage = new EventEmitter();

  @Output() columnSelected = new EventEmitter<any>();
  @Input() sortColumn: any;


  EnumTableDisplayType = {
    Text: 0,
    Checkbox: 1,
    Date: 2,
    Number: 3,
    Boolean: 4,
    ObjectMapping: 5
  };

  listener: any;
  constructor(private renderer: Renderer2, private elm: ElementRef) {

  }

  ngOnInit() {
    this.valueCheckbox = this.configTable.columns.filter(x => x.isCheckbox === true);

    this.configTable.columns.forEach(col => {
      switch (col.align) {
        case 'center':
          col.cssClass = 'center-align';
          break;
        case 'right':
          col.cssClass = 'right-align';
          break;
      }

      if (col.isCheckbox) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.Checkbox;
        if (!col.cssClass) {
          col.cssClass = 'center-align';
        }
        return;
      }

      if (col.isIndex) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.Text;
        if (!col.cssClass) {
          col.cssClass = 'center-align';
        }
        return;
      }

      if (col.isDate) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.Date;
        if (!col.cssClass) {
          col.cssClass = 'center-align';
        }
        return;
      }

      if (col.isNumber) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.Number;
        if (!col.cssClass) {
          col.cssClass = 'right-align';
        }
        return;
      }

      if (col.isCommonStatus) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.ObjectMapping;
        if (!col.cssClass) {
          col.cssClass = 'center-align';
        }
        return;
      }

      if (col.isBoolean) {
        col.tableDisplayTypeId = this.EnumTableDisplayType.Boolean;
        if (!col.cssClass) {
          col.cssClass = 'center-align';
        }
        return;
      }

      col.tableDisplayTypeId = this.EnumTableDisplayType.Text;
    });

  }
  ngAfterViewInit() {

  }
  ngOnChanges(chang: SimpleChanges) {
    setTimeout(() => {
      const h = $('.search-view-box').height();
      const tol = $('.nav-tools').height();
      if (h && h > 20) {
        $('.table-bill').css('height', `calc(100vh - ${h + tol + 62}px)`);
      } else {
        $('.table-bill').css('height', `calc(100vh - ${tol + 47}px)`);
      }
    }, 1111);
    this.lastChecked = null;


  }

  sortData(column) {
    if (column.isSortAble === false) {
      return;
    }
    if (column.value == 'Approved') {
      column.value = 'is' + column.value;
    }
    this.columnSelected.emit(column.value);
  }
  getSortClass(column) {

    if (this.sortColumn == column) {
      return !this.reverseSort
        ? 'fa-sort-down'
        : 'fa-sort-up';

    }

  }
  // goPage(page) {
  //   this.pageindex = page;
  //   this.itemchecked = false;
  //   this.changePage.emit(page);
  // }

  // checkbox
  checkItem(Id, checked) {
    let isCheck = true;
    this.checkedValue.emit(false);
    if (Id > 0) {
      isCheck = checked;
    }
    this.data.forEach(item => {
      if (Id > 0) {
        if (item[this.valueCheckbox.value] == Id) {
          item.checked = checked;
          isCheck = checked;
        }
      } else if (Id == -1) {
        item.checked = checked;
      }
      if (item.checked != true) {
        isCheck = false;
      }
      // checkShowtool
      if (item.checked === true) {
        this.checkedValue.emit(true);
      }
    });
    if (Id > 0) {
      this.itemchecked = isCheck;
    }
  }
  shift(e, ev) {
    if (this.lastChecked == null) {
      this.lastChecked = e;
      return;
    }

    if (ev.shiftKey) {
      if (this.lastChecked < e) {
        if (this.data[e].checked) {
          for (let item = this.lastChecked; item <= e; item++) {
            this.data[item].checked = false;
          }
        } else {
          for (let item = this.lastChecked; item <= e; item++) {
            this.data[item].checked = true;
          }
        }
      } else if (this.lastChecked > e) {
        if (this.data[e].checked) {
          for (let item = e; item <= this.lastChecked; item++) {
            this.data[item].checked = false;
          }
        } else {
          for (let item = e; item <= this.lastChecked; item++) {
            this.data[item].checked = true;
          }
        }
      }
    }

    this.lastChecked = e;
  }

  onDbClick(event, char) {
    this.currentValue = char;
    this.DoubleClickValue.emit(this.currentValue);
  }
  onLeftClick(event, char, col, value) {
    this.currentValue = char;
    this.selectedValue.emit(this.currentValue);
    this.checkClick = true;
    $('.glowTableBody tr').removeClass('selected');
    $(event.currentTarget).parent().addClass('selected');
    $('.table-bill .glowTableBody tr td').removeClass('active');
    $(event.currentTarget).addClass('active');
    const info = {
      column: col,
      row: char,
      value: value
    };
    this.selectedTd.emit(info);
  }

  @ViewChild("tbl") tbl;

  // activates the menu with the coordinates
  onrightClick(event, char) {
    const bh = document.documentElement.scrollHeight;

    let top = $(this.elm.nativeElement).offset().top;

    this.contextmenuY = event.clientY - top;

    let contextHeight = 0;
    if (this.configTable && this.configTable.eventTable) {
      contextHeight = this.configTable.eventTable.length * 32;
    }
    if ((this.contextmenuY + contextHeight) > bh) {
      this.contextmenuY = this.contextmenuY - contextHeight;
    }

    this.currentValue = char;
    this.contextmenuX = event.clientX + 1;
    this.contextmenu = true;
    // const theme = localStorage.getItem('theme');
    $('.glowTableBody tr').removeClass('selected');
    $(event.currentTarget).parent().addClass('selected');
  }

  // disables the menu
  disableContextMenu() {
    this.contextmenu = false;
    // const theme = localStorage.getItem('theme');
    if (this.checkClick !== true) {

      $('.glowTableBody tr').removeClass('selected');
      // tslint:disable-next-line: deprecation
      $(event.currentTarget).parent().addClass('selected');
      this.checkClick = false;
    }
  }

}
