import { Component, AfterViewInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging-data',
  templateUrl: './paging-data.component.html',
  styleUrls: ['./paging-data.component.scss']
})
export class PagingDataComponent implements AfterViewInit, OnChanges {
  @Input() limit: any;
  @Input() pageIndex: number;
  @Input() total: number;
  @Output() changeLimit = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  totalPage: number;
  fromRecord: number;
  toRecord: number;
  constructor() { }

  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['total'] && changes['total'].previousValue !== changes['total'].currentValue) {
      if (this.total % this.limit > 0) {
        this.totalPage = (this.total / this.limit) + 1;
      } else {
        this.totalPage = (this.total / this.limit);
      }
      this.totalPage = Math.floor(this.totalPage);
      this.fromRecord = ((this.pageIndex - 1) * this.limit) + 1;
      this.toRecord = (this.pageIndex * this.limit);
      this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
     }
    if (changes && changes['limit'] && changes['limit'].previousValue !== changes['limit'].currentValue) {
       this.limit = parseInt(this.limit, null);
       if (this.total % this.limit > 0) {
        this.totalPage = (this.total / this.limit) + 1;
      } else {
        this.totalPage = (this.total / this.limit);
      }
      this.totalPage = Math.floor(this.totalPage);
      this.fromRecord = ((this.pageIndex - 1) * this.limit) + 1;
      this.toRecord = (this.pageIndex * this.limit);
      this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
     }
    }
  changelimit(e) {
    this.changeLimit.emit(e);
  }
  nextp() {
    if (this.pageIndex < this.totalPage) {
      this.pageIndex++;
      this.next.emit(this.pageIndex);
      this.fromRecord = ((this.pageIndex - 1) * this.limit) + 1;
      this.toRecord = (this.pageIndex * this.limit);
      this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
    }
  }
  prevp() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.prev.emit(this.pageIndex);
      this.fromRecord = ((this.pageIndex - 1) * this.limit) + 1;
      this.toRecord = (this.pageIndex * this.limit);
      this.toRecord >= this.total ? this.toRecord = this.total : this.toRecord = this.toRecord;
    }
  }
}
