import { Directive, ElementRef, OnChanges, SimpleChanges, HostListener, Input, ChangeDetectorRef, AfterViewChecked, AfterContentChecked, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { formatNumber, formatThousandNumber } from 'src/app/common/helpers/number';

@Directive({
  selector: '[input-number]',
  host: {
    '(keyup)': 'onKeyUp()',
    '(change)': 'onInputChange()',
    '(blur)': 'onBlur()',
    '(focus)': 'onInputForcus()',
    //'(keydown.Tab)': 'onInputForcus()',

  }
})
export class InputNumberDirective implements OnChanges, AfterViewInit {


  @Input() 'input-number': any;
  @Input() 'decimal-place': number;
  @Input() 'min-number': any;
  @Input() 'max-number': any;

  modelValue: string;
  viewValue: string;

  timeoutId;
  constructor(public model: NgModel, private el: ElementRef, private cdRef: ChangeDetectorRef) {
    el.nativeElement.style.textAlign = 'right';
  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    setTimeout(() => {
      this.onInputChange();
    }, 0);
  }

  onBlur() {
    clearTimeout(this.timeoutId);
    this.onInputChange(true);
  }

  onKeyUp() {
    this.onInputChange(false);
  }

  onInputChange(isBlur = false) {

    this.modelValue = this.getModelValue() + '';
    this.modelValue = this.modelValue.trim();

    if (this.modelValue.indexOf('.') == this.modelValue.length - 1) {
      this.modelValue = this.modelValue.substr(0, this.modelValue.length - 1);
    }

    let decimalPlace = undefined;
    if (this["decimal-place"] >= 0) {
      decimalPlace = this["decimal-place"];
    }
    let value = this.modelValue;
    if (value) {
      if (decimalPlace) {
        value = parseFloat(this.modelValue).toFixed(decimalPlace);
      }
      value = parseFloat(value) + '';
    }

    if (isNaN(parseFloat(value))) {
      value = '';
    }

    if (this["max-number"]) {
      if (value > this["max-number"]) {
        value = this["max-number"];
      }
    }


    if (this["min-number"]) {
      if (value < this["min-number"]) {
        value = this["min-number"];
      }
    }

    this.viewValue = this.format(value);
    this.model.viewToModelUpdate(value);

    const txt = this.model.value + '';

    if (!isBlur && txt && txt.indexOf('.') == txt.length - 1) {
      return;
    }

    if (txt && txt.indexOf('.') > 0 && txt[txt.length - 1] == '0' && !isBlur) {
      return;
    }

    this.model.valueAccessor.writeValue(this.viewValue);
    this.cdRef.detectChanges();
  }

  onInputForcus() {
    let $this = this;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      $this.el.nativeElement.select();
    }, 10);
  }

  getModelValue() {
    let modelValue = this.model.value;
    const firstChar = modelValue ? modelValue.toString().substring(0, 1) : null;
    if (!modelValue) { return modelValue; }

    modelValue += '';
    if (modelValue.indexOf('.') != modelValue.lastIndexOf('.')) {
      modelValue = modelValue.substring(0, modelValue.lastIndexOf('.'));
    }
    const num = modelValue.replace(/[^\.0-9]/ig, '');
    const retNumber = Number(num);
    return isNaN(retNumber) ? null : firstChar === '-' ? '-' + num : num;
  }

  format(retNumber) {

    return isNaN(retNumber) ? null : formatThousandNumber(retNumber);
    // return (isNaN(retNumber) || !retNumber) ? '0' : formatNumber(retNumber, 10);
  }
}
