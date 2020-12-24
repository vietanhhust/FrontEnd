import { Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare var $: any;

const noop = () => {
};
@Component({
  selector: 'input-time-picker',
  templateUrl: './input-time-picker.component.html',
  styleUrls: ['./input-time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTimePickerComponent),
    multi: true
  }]
})
export class InputTimePickerComponent implements ControlValueAccessor, OnInit {
  private _elm: ElementRef;
  private _elmValue: ElementRef;
  disabled: boolean;
  isWrite: boolean;
  id: string;
  name: string;
  format: string;
  text: string = '';
  private dateValue: string;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private onValidateCallback: () => void = noop;

  private toFormat(input: string): string {
    return input;
  }
  toString() {
    return this.toFormat(this.dateValue);
  }
  //get accessor
  get value(): any {
    return this.text;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (this.disabled && !this.isWrite)
      return;
    if (v) {
      console.log(v);
      let newT = this.toFormat(v);
      if (newT != this.text) {
        this.text = newT;
        this.dateValue = v;
        this.onChangeCallback(v);
      }
    }
  }

  writeValue(obj: any): void {
    this.isWrite = true;
    this.value = obj;
    this.isWrite = true;
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
  constructor(elm: ElementRef) {
    this._elm = elm;
  }
  ngOnInit(): void {
    let me = this;
    this._elmValue = this._elm.nativeElement.querySelector('input');
    $(this._elm.nativeElement).clockpicker({
      placement: 'top',
      align: 'left',
      autoclose: true,
      'default': 'now',
      donetext: 'Xong',
      afterDone: function () {
        console.log("Done: " + $(me._elmValue)[0].value);
        me.value = $(me._elmValue)[0].value;
      }
    });

    console.log("Text:" + this.text);
  }
}
