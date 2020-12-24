import { Component, OnInit, Input, ElementRef, forwardRef, ViewChild, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NgModel, NgControl, FormControl, Validators } from '@angular/forms';

declare var $: any;

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectFieldRequiredComponent),
  multi: true
};

@Component({
  selector: 'select-field',
  template: `
    <div class="select-custom">  
      <select [selected]="value" [disabled]='disabled' [data]="data" select-control class="materselect validate"  [(ngModel)]="value" [required]="required" #modelName="ngModel"
          [id]="id"
          [name]="name"
          [class.invalid]="modelName.invalid && frm.invalid && frm.submitted"
          [class.valid]="!modelName.invalid && !frm.invalid && !frm.submitted && modelName.touched">
              <option *ngFor="let p of data"  [ngValue]="p.value" [disabled]="value==p.value && disabled"  >
                  {{p.title}}
              </option>
      </select>
      <span *ngIf="(error=='required' && frm.invalid && frm.submitted) || (modelName.dirty && error=='required')"
      class="helper-text" >Vui lòng chọn {{title}}</span>
  </div>

  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectFieldRequiredComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectFieldRequiredComponent),
    multi: true
  }]
})
export class SelectFieldRequiredComponent implements ControlValueAccessor, Validator {

  @Input()
  data: OptionModel[];

  // @Input()
  // selected: OptionModel;

  @ViewChild('modelName', { static: false }) inputModel: NgModel;
  title: string;
  id: string;
  name: string;
  required: string;
  error: string = '';
  @Input()
  disabled: string = ''
  @Input()
  frm: any
  constructor(elm: ElementRef, private _injector: Injector) {
    let nav = elm.nativeElement;
    this.title = $(nav).attr('title');
    this.id = $(nav).attr('id');
    this.name = $(nav).attr('name');
    this.required = $(nav).attr('required');
    if (!this.disabled)
      this.disabled = $(nav).attr('disabled');
    if (!this.id) {
      this.id = this.name;
    }

  }

  private innerValue: any = [''];

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }

    let control = this._injector.get(NgControl) as NgControl;
    setTimeout(() => {
      control.control.updateValueAndValidity();
    }, 0);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  validate(control: AbstractControl): ValidationErrors {
    // check required
    if (this.required != undefined) {
      let req = Validators.required(control);
      if (req != null) {
        this.error = 'required';
        return req;
      }
      else {
        this.error = '';
        return req;
      }
    }
    return null;
  }

}
