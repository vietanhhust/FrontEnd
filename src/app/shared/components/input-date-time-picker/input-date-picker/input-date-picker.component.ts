import { Component, ElementRef, forwardRef, OnInit, AfterViewInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { interval } from 'rxjs';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';
import { PopupCountService } from 'src/app/shared/services/popupCount.service';

declare let M: any;

const noop = () => {
};

/**
 * Component chọn ngày tháng
 * isHorizontal = true Nếu muốn hiển thị input chọn ngày nằm ngang
 * isInCell = true Nếu muốn hiển thị input chọn ngày trong cell của table
 */
@Component({
  selector: 'input-date-picker',
  templateUrl: './input-date-picker.component.html',
  styleUrls: ['./input-date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDatePickerComponent),
    multi: true
  }]
})
export class InputDatePickerComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy {
  private _elm: ElementRef;
  id: string;
  name: string;
  format: string;
  disabled: boolean;
  readonly: boolean;
  required: string;
  text = '';
  title = '';
  private isWrite = false;
  @Input()
  frm: any;
  @Input()
  customStyle?: any;

  @Input()
  isHorizontal: boolean;

  @Input()
  isInCell: boolean;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private onValidateCallback: () => void = noop;
  placeholder: any;
  //interval: any;

  // get accessor
  get value(): any {
    return this.text;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== 0) {
      const dt = this._dateHelperService.getUnixDate(v);
      let newT;
      if (this.isWrite === true) {
        if (v) {
          v = v.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
        }
        this.text = v;
        this.onChangeCallback(v);
      } else {
        newT = dt;
        if (newT !== this.text) {
          if (v) {
            if (newT !== 'Invalid date') {
              this.text = newT;
            } else {
              this.text = v;
            }
          }
          this.onChangeCallback(this.text);
        }
      }
    }

  }
  focusFunction() {
    this.isWrite = true;
  }

  writeValue(obj: any): void {
    this.value = obj;
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

  @ViewChild('pickerElm') pickerElm: ElementRef

  constructor(elm: ElementRef, private _dateHelperService: dateHelperService) {
    this._elm = elm;
  }
  ngOnDestroy(): void {
    //this.interval.unsubscribe();
  }
  ngOnInit(): void {
    const input = this._elm.nativeElement;
    this.format = input.getAttribute('format');
    this.disabled = input.getAttribute('disabled');
    this.readonly = input.getAttribute('readonly');
    this.placeholder = input.getAttribute('placeholder');
    this.required = input.getAttribute('required');
    this.id = this._elm.nativeElement.getAttribute('id');
    if (!this.format) {
      this.format = 'DD/MM/YYYY';
    }
    if (input.getAttribute('title')) {
      this.title = input.getAttribute('title');
    }
  }
  initPicker() {
    const that = this;
    this.id = this._elm.nativeElement.getAttribute('id');
    const instance = M.Datepicker.init(this.pickerElm.nativeElement, {
      format: this.format,
      autoClose: true,
      showDaysInNextAndPreviousMonths: true,
      firstDay: 1,
      onOpen: function (e) {
        that.isWrite = false;
        
        try {
          const date = that._dateHelperService.convertFormatDate(that.value, 'dd/MM/yyyy', 'MM/dd/yyyy');
          instance.setDate(new Date(date));
        } catch (e) {

        }

        PopupCountService.popups.push(null);
      },
      onSelect: function (e) {
        that.value = that._dateHelperService.convertFormatDate(e, 'dd/MM/yyyy', 'dd/MM/yyyy');
      },
      i18n: {
        done: 'Xong', cancel: 'Hủy', months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'], weekdaysShort: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        weekdaysAbbrev: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
      }
    });
  }
  ngAfterViewInit(): void {
    this.initPicker();
  }
}
