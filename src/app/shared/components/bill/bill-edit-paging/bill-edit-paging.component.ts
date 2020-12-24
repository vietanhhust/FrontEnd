import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bill-edit-paging',
  templateUrl: './bill-edit-paging.component.html',
  styleUrls: ['./bill-edit-paging.component.scss']
})
export class BillEditPagingComponent implements OnInit {
  @Input() fromRecord: any;
  @Input() limit: any;
  @Input() toRecord: any;
  @Input() total: any;
  @Input() pageIndex: any;
  @Input() totalPage: any;
  @Input() prepareKey: any;
  @Input() keyword: any;
  @Input() isShowPage: any;
  @Input() isShowSearch?: boolean;

  @Output() fromRecordChange = new EventEmitter();
  @Output() limitChange = new EventEmitter();
  @Output() toRecordChange = new EventEmitter();
  @Output() pageIndexChange = new EventEmitter();
  @Output() totalPageChange = new EventEmitter();
  @Output() prepareKeyChange = new EventEmitter();
  @Output() keywordChange = new EventEmitter();
  @Output() isShowPageChange = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSearchs(key) {
    this.onSearch.emit(key);
  }
  calcTotalpage() {
    if (this.total % parseInt(this.limit.toString(), null) > 0) {
      this.totalPage = (this.total / parseInt(this.limit.toString(), null)) + 1;
    } else {
      this.totalPage = (this.total / parseInt(this.limit.toString(), null));
    }
    this.totalPage = Math.floor(this.totalPage);
    return this.totalPage;
  }
  changelimit() {
    this.isShowPage = false;
    this.fromRecord = 1;
    this.toRecord = parseInt(parseInt(this.limit.toString(), null).toString(), null);
    this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = parseInt(this.limit.toString(), null);
    this.emitExe();
    setTimeout(() => {
      this.isShowPage = true;
      this.isShowPageChange.emit(this.isShowPage);
     }, 800);
  }
  nextp() {
    this.isShowPage = false;
      if (this.pageIndex < this.calcTotalpage()) {
        this.pageIndex++;
        this.fromRecord = ((this.pageIndex - 1) * parseInt(this.limit.toString(), null)) + 1;
        this.toRecord = (this.pageIndex * parseInt(this.limit.toString(), null));
        this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
      }
      this.emitExe();
      setTimeout(() => {
        this.isShowPage = true;
        this.isShowPageChange.emit(this.isShowPage);
       }, 800);
  }
  prevp() {
    this.isShowPage = false;
    this.calcTotalpage();
      if (this.pageIndex > 1) {
        this.pageIndex--;
        this.fromRecord = ((this.pageIndex - 1) * parseInt(this.limit.toString(), null)) + 1;
        this.toRecord = (this.pageIndex * parseInt(this.limit.toString(), null));
        this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
      }
      this.emitExe();
      setTimeout(() => {
        this.isShowPage = true;
        this.isShowPageChange.emit(this.isShowPage);
       }, 800);
  }

  emitExe() {
    this.fromRecordChange.emit(this.fromRecord);
    this.limitChange.emit(this.limit);
    this.toRecordChange.emit(this.toRecord);
    this.pageIndexChange.emit(this.pageIndex);
    this.totalPageChange.emit(this.totalPage);
    this.prepareKeyChange.emit(this.prepareKey);
    this.keywordChange.emit(this.keyword);
    this.isShowPageChange.emit(this.isShowPage);
  }
}
