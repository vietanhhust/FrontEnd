import { Component, OnInit, Input, ElementRef, forwardRef, ViewChild, AfterViewInit, ChangeDetectorRef, Injector, Injectable } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_ASYNC_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NgModel, Validators, NG_VALIDATORS, NgControl, FormControl } from '@angular/forms';

const noop = () => {
};

@Component({
  selector: 'input-field',
  template: `
  <p>{{title}} <span *ngIf='required!=null' style='color: red'>&nbsp;(*)</span>:</p>
  <div class="input-field inline">
    <input [type]="type" class="validate" [(ngModel)]="value" [required]="required"
        [maxlength]="maxlength"
        [minlength]="minlength"
        [min]="min"
        [max]="max"
        [readonly] = "readonly"
        #modelName="ngModel"
        [id]="id"
        [disabled]="disabled || disable"
        [name]="name"
        [class.disable]="disable"
        [class.invalid]="modelName.invalid && frm.invalid && frm.submitted"
        [class.valid]="!modelName.invalid && !frm.invalid && !frm.submitted && modelName.touched" />

    <!--  check required -->
    <span *ngIf="(modelName?.errors?.required && frm.invalid && frm.submitted) || (modelName.dirty && modelName?.errors?.required)"
    class="helper-text" >Vui lòng nhập {{title}}</span>

    <!--  check Email -->
    <span *ngIf="(error=='email' && frm.invalid && frm.submitted) || (modelName.dirty && error=='email')"
    class="helper-text" >Vui lòng nhập email đúng định dạng. Ex: Sample@gmail.com</span>

    <!-- check maxlength-->
    <span *ngIf="(error=='maxL' && frm.invalid && frm.submitted) || (modelName.dirty && error=='maxL')"
    class="helper-text" >{{title}} không được quá {{maxlength}} ký tự</span>

    <!-- check minlength-->
    <span *ngIf="(error=='minL' && frm.invalid && frm.submitted) || (modelName.dirty && error=='minL')"
    class="helper-text" >{{title}} không được ít hơn {{maxlength}} ký tự</span>

    <!--check min-->
    <span *ngIf="(error=='min' && frm.invalid && frm.submitted) || (modelName.dirty && error=='min')"
    class="helper-text" >{{title}} không được nhỏ hơn {{min}}</span>

    <!--check max-->
    <span *ngIf="(error=='max' && frm.invalid && frm.submitted) || (modelName.dirty && error=='max')"
    class="helper-text" >{{title}} không được lớn hơn {{max}}</span>

</div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldRequiredComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputFieldRequiredComponent),
    multi: true
  }]
})
export class InputFieldRequiredComponent implements ControlValueAccessor, Validator {

  @ViewChild('modelName', { static: false }) inputModel: NgModel;
  title: string;
  type: string;
  id: string;
  name: string;
  maxlength: number;
  minlength: number;
  max: number;
  min: number;
  @Input()
  readonly: string;
  required: string;
  @Input()
  frm: any;
  checkmin: boolean;
  checkmax: boolean;
  error: string = '';
  class: any;
  @Input()
  disable?: string;

  @Input()
  disabled: any;
  
  constructor(public elm: ElementRef, private ref: ChangeDetectorRef, private _injector: Injector) {
    let nav = elm.nativeElement;
    this.title = nav.getAttribute('title');
    this.type = nav.getAttribute('type');
    this.id = nav.getAttribute('id');
    this.name = nav.getAttribute('name');
    this.maxlength = nav.getAttribute('maxlength');
    this.minlength = nav.getAttribute('minlength');
    this.max = nav.getAttribute('max');
    this.min = nav.getAttribute('min');
    if (!this.readonly)
      this.readonly = nav.getAttribute('readonly');
    this.required = nav.getAttribute('required');
    this.disable = nav.getAttribute('disable');
    if (!this.id) {
      this.id = this.name;
    }
    if (!this.type) {
      this.type = 'text';
    }
    //console.log(this.inputModel);
  }

  ngOnInit() {
    this.required = this.elm.nativeElement.getAttribute('required');
  }
  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private onValidateCallback: () => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.value = value;
    }

    let control = this._injector.get(NgControl) as NgControl;

    setTimeout(() => {
      control.control.updateValueAndValidity();
      control.control.markAsPristine();
    }, 0);

  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }



  validate(control: AbstractControl): ValidationErrors {
    //return [{ "required": {value: "abc"} }]
    //return Validators.required(this.innerValue)

    // check minlength
    if (this.minlength != undefined) {
      let minL = new FormControl(control.value, Validators.minLength(this.minlength));
      if (minL.errors != null) {
        this.error = 'minL';
        return minL.errors;
      }
      else {
        this.error = '';
        return minL.errors;
      }
    }
    // check maxnlength
    if (this.maxlength != undefined) {
      let maxL = new FormControl(control.value, Validators.maxLength(this.maxlength));
      if (maxL.errors != null) {
        this.error = 'maxL';
        return maxL.errors;
      }
      else {
        this.error = '';
        return maxL.errors;
      }
    }
    // check min number
    if (this.min != undefined) {
      let min = new FormControl(control.value, Validators.min(this.min));
      if (min.errors != null) {
        this.error = 'min';
        return min.errors;
      }
      else {
        this.error = '';
        return min.errors;
      }
    }
    // check max number
    if (this.max != undefined) {
      let max = new FormControl(control.value, Validators.max(this.max));
      if (max.errors != null) {
        this.error = 'max';
        return max.errors;
      }
      else {
        this.error = '';
        return max.errors;
      }
    }
    // check email
    if (this.type == 'email') {
      let email = this.validateEmailFactory(control.value);
      if (email != null) {
        this.error = 'email';
        return email;
      }
      else {
        this.error = '';
        return email;
      }
    }

    return null;
    //return this.inputModel.validator(this.inputModel.control)
    //return Validators.required(this.inputModel.control);
    //return this.innerValue ? null : { "required": { value: "abc" } }
  }

  // custom validate Email
  validateEmailFactory(value: string) {
    let EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
    return EMAIL_REGEXP.test(value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidateCallback = fn;
  }

  identify(event: any) {
    // console.log(event.data);
    try {
      if (this.type == "number") {
        if ((this.innerValue as String).length > 15) {
          this.innerValue = (this.innerValue as String).slice(0, 16);
        }
      }
    }
    catch {

    }
    // this.value = /^\d*\.?\d*$/.test(this.value);


  }
}

