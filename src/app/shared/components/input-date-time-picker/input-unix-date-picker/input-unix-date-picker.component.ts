import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';
import { PopupCountService } from 'src/app/shared/services/popupCount.service';

declare let M: any;
@Component({
  selector: 'input-unix-date-picker',
  templateUrl: './input-unix-date-picker.component.html',
  styleUrls: ['./input-unix-date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputUnixDatePickerComponent),
    multi: true
  }]
})
export class InputUnixDatePickerComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @ViewChild('pickerElm') pickerElm: ElementRef

  @Input()
  name: string;
  @Input()
  format: string = 'DD/MM/YYYY';
  @Input()
  disabled: boolean;
  @Input()
  readonly: boolean;
  @Input()
  required: string;

  date: string = ''

  @Input()
  frm: any;

  private onTouchedCallback: () => () => {};
  private onChangeCallback: (_: any) => () => {};

  constructor(private _dateHelperService: dateHelperService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }

  get value(): number {

    if (!this.date) return null;

    return this._dateHelperService.convertVietNamDateStringToUnix(this.date);
  }

  // set accessor including call the onchange callback
  set value(v: number) {
    if (v === this.value || (!v && !this.value)) return;
    if (v) {
      this.date = this._dateHelperService.convertUnixToVietNamDateString(v);
    } else {
      this.date = '';
    }



  }

  //angular issue https://github.com/angular/angular/issues/14988
  // writeValue twice, so tiptrick if(obj==0) then callback with null value, undefined or null is not value of datetime
  writeValue(obj: any): void {
    this.value = obj;
    if (this.onChangeCallback && (obj || obj == 0))
      this.onChangeCallback(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initPicker();
  }

  initPicker() {
    const that = this;

    const instance = M.Datepicker.init(this.pickerElm.nativeElement, {
      format: this.format,
      autoClose: true,
      showDaysInNextAndPreviousMonths: true,
      firstDay: 1,
      onOpen: function (e) {
        try {
          if (that.value) {
            instance.setDate(new Date(that.value * 1000));
          }
          PopupCountService.popups.push(null);
        } catch (ex) {
          console.log(ex)
        }
      },
      onClose: function (e) {
        PopupCountService.popups.pop();
      },
      onSelect: function (e) {
        try {
          let v = e.getTime() / 1000;
          that.writeValue(v ? v : 0);
        } catch (error) {
          console.log(error)
        }

      },
      i18n: {
        done: 'Xong', cancel: 'Hủy', months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'], weekdaysShort: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        weekdaysAbbrev: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
      }
    });
  }

  checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
  }

  onKeyup() {
    var input = this.date;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
      return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    if (values[1]) values[1] = this.checkValue(values[1], 12);

    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + '/' : v;
    });
    this.date = output.join('').substr(0, 14);
    let v = this.value;
    this.writeValue(v ? v : 0);
  }

  onBlur() {
    var input = this.date;
    var values = input.split('/').map(function (v, i) {
      return v.replace(/\D/g, '')
    });
    var output = '';

    if (values.length == 3) {
      var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
      var month = parseInt(values[1]) - 1;
      var day = parseInt(values[0]);
      var d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {

        var dates = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
        output = dates.map(function (v) {
          let s = v.toString();
          return s.length == 1 ? '0' + v : v;
        }).join('/');
      }
    }
    this.date = output;
    let v = this.value;
    this.writeValue(v ? v : 0);
  }

}
