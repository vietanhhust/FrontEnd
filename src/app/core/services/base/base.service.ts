import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnumModule } from 'src/app/common/constants/global/Enums';

export class FileObject {
  file: File;
  name: string;

  constructor(file: File, name: string) {
    this.file = file;
    this.name = name;
  }
}

export interface RequestUrl {
  url: string;
  params: object;
}

export interface BaseRequestOptions {
  body?: null,
  headers?: HttpHeaders;
  observe?: any;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

export interface ExtraRequestOptions extends BaseRequestOptions {
  withoutLoader?: boolean;
  noErrorMessage?: boolean;
}


export function CreateDynamicAccountingNumberControl(fieldName: string, title: string, value: string, filters: string, originalObject: any) {

  // return {
  //   fieldName: fieldName,
  //   formTypeId: FormDataType.SearchTable,
  //   dataTypeId: EnumDataType.Text,
  //   dataSize: 128,
  //   autoIncrement: false,
  //   isRequired: false,
  //   isUnique: false,
  //   isHidden: false,
  //   title: title,
  //   column: 0,
  //   lstSelect: [],
  //   filters: filters,
  //   originalObject: originalObject,
  //   objectTypeId: null,
  //   objectId: 0,
  //   moduleId: 0,

  //   value: value,
  //   titleValue: value,

  //   refTableCode: '_AccountingAccount',
  //   refTableField: 'AccountNumber',
  //   refTableTitle: 'AccountNumber',
  // } as DynamicFieldInputModel<any>;
}

export function CreateDynamicAccountingNumberField(fieldName: string, title: string, value: string, filters: string, originalObject: any, isReadOnly: boolean) {

  // return {
  //   fieldName: fieldName,
  //   formTypeId: isReadOnly ? FormDataType.ViewOnly : FormDataType.Select,
  //   dataTypeId: isReadOnly ? EnumDataType.Text : EnumDataType.Number,
  //   dataSize: 0,
  //   autoIncrement: false,
  //   isRequired: false,
  //   isUnique: false,
  //   isHidden: false,
  //   title: title,
  //   column: 0,
  //   lstSelect: [],
  //   filters: filters,
  //   originalObject: originalObject,
  //   objectTypeId: null,
  //   objectId: 0,
  //   moduleId: EnumModule.CategoryData,

  //   value: value,
  //   titleValue: value,

  //   refTableCode: '_User',
  //   refTableField: 'F_Id',
  //   refTableTitle: 'DisplayName',
  // } as DynamicFieldInputModel<any>;
}