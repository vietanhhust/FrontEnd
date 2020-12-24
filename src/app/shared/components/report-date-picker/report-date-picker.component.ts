import { Component, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { dateHelperService } from '../../services/getFirstloadDate.service';
declare let $;

@Component({
  selector: 'app-report-date-picker',
  templateUrl: './report-date-picker.component.html',
  styleUrls: ['./report-date-picker.component.scss'],
})
export class ReportDatePickerComponent implements AfterViewInit, OnInit {

  data: any;
  class: {} = {};
  type = 'thang';
  thang: any;
  quy: any;
  nam: any;
  value = {
    from: '',
    to: '',
    type: ''
  };
  lstYear = [];
  @ViewChild('modal', { static: false }) modal: ElementRef;
  @Output()
  selectedValue = new EventEmitter();
  elm: any;
  id = '';
  constructor(elem: ElementRef, private dateHelperService: dateHelperService
  ) {
    this.id = $(elem.nativeElement).attr('id');
   }
  ngOnInit(): void {
    const date = new Date();
    this.thang = date.getMonth() + 1;
    this.nam = date.getFullYear();
    this.quy = Math.floor((date.getMonth() + 3) / 3);
    const ymin = (date.getFullYear() - 5);
    const ymax = (date.getFullYear() + 5);
     for (let index = ymax; index > this.nam; index--) {
      this.lstYear.push(index);
     }
    for (let index = this.nam; index >= ymin  ; index--) {
      this.lstYear.push(index);
     }
  }
  ngAfterViewInit() {
    this.elm = $(this.modal.nativeElement);
    $('.modaluipicker').modal();
    $('.tooltipped').tooltip();
  }
  open() {
    $('#' + this.id + '.modaluipicker').modal('open');
  }
  save() {
    if (this.type === 'thang') {
      let from = this.dateHelperService.startOfMonth(this.thang).split('/');
      let to =  this.dateHelperService.endOfMonth(this.thang).split('/');
      this.value.from = from[0] + '/' + from[1] + '/' + this.nam;
      if(this.nam%4==0 && this.thang==2)
        this.value.to = to[0] + '/' + to[1] + '/' + this.nam;
      else if(this.nam%4!==0&&this.thang==2)
        this.value.to = (Number.parseInt(to[0])-1) + '/' + to[1] + '/' +this.nam;
      else{
        this.value.to = to[0] + '/' + to[1] + '/' + this.nam;
      }
        this.value.type = this.type;
    } else if (this.type === 'quy') {
      this.value.from = this.dateHelperService.getStartQuader(this.quy.toString());
      this.value.to = this.dateHelperService.getEndQuader(this.quy.toString());
      this.value.from = this.value.from.replace(this.value.from.split('/')[2], this.nam);
      this.value.to = this.value.to.replace(this.value.to.split('/')[2], this.nam);
      this.value.type = this.type;
    } else {
      this.value.from = '01/01/' + this.nam;
      this.value.to = '31/12/' + this.nam;
    }
    this.selectedValue.emit(this.value);
    $('#' + this.id + '.modaluipicker').modal('close');
  }
  close() {
    $('#' + this.id + '.modaluipicker').modal('close');
  }
}
