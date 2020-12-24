import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateHelperService } from '../../services/getFirstloadDate.service';
import { PopupCountService } from '../../services/popupCount.service';
declare let M: any;
@Component({
  selector: 'input-date-time-picker',
  templateUrl: './input-date-time-picker.component.html',
  styleUrls: ['./input-date-time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDateTimePickerComponent),
    multi: true
  }]
})
export class InputDateTimePickerComponent implements ControlValueAccessor {
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

  date: number
  hour: number = 0;
  minute: number = 0;

  @Input()
  frm: any;

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => () => {};
  private onChangeCallback: (_: any) => () => {};
  private onValidateCallback: () => () => {};

  //interval: any;

  // get accessor
  get value(): number {

    if (!this.date) return null;

    return this.addTime(this.date);
  }

  // set accessor including call the onchange callback
  set value(v: number) {
    if (v === this.value || (!v && !this.value)) return;
    if (v) {
      const dt = this._dateHelperService.unixToDate(v);
      this.date = v;
      this.hour = dt.getHours();
      this.minute = dt.getMinutes();
    } else {
      this.date = null;
      this.hour = null;
      this.minute = null;
    }

  }

  constructor(private _dateHelperService: dateHelperService) {

  }


  addTime(unixTime: number) {
    if (this.hour) {
      unixTime += this.hour * 60 * 60;
    }

    if (this.minute) {
      unixTime += this.minute * 60;
    }
    return unixTime;
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.onChangeCallback)
      this.onChangeCallback(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChangeTime() {
    this.writeValue(this.value);
  }

  onChangeDate() {
    this.writeValue(this.value);
  }
}
