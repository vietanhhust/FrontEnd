
import { NgModule } from '@angular/core';
import { AnchorDirective } from './directives/AnchorDirective';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown.directive';
import { SelectControlDirective } from './directives/select-control.directive';
import { Error403Page } from './pages/error403/error403.page';
import { TabsDirective } from './directives/tabs.directive';
import { TruncatePipe } from '../common/pipes/truncate.pipe';
import { FormDefaultDirective } from './directives/form-default.directive';
import { TransformFormDirective } from './directives/transform-form.directive';
import { Error404Page } from './pages/error404/error404.page';
import { ToNumberPipe } from '../common/pipes/ToNumber.pipe';
import { InputNumberDirective } from './directives/input-number.directive';
import { ValidateInputDirective } from './directives/validate-input.directive';
import { InputFieldRequiredComponent } from './components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { SelectFieldRequiredComponent } from './components/select-field/select-field.component';
import { SelectMultiRequiredComponent } from './components/selectmulti-field/selectmulti-field.component';
import { InputDateTimePickerComponent } from './components/input-date-time-picker/input-date-time-picker.component';
import { InputDatePickerComponent } from './components/input-date-time-picker/input-date-picker/input-date-picker.component';
import { InputTimePickerComponent } from './components/input-date-time-picker/input-time-picker/input-time-picker.component';
import { SumPipe } from '../common/pipes/sum.pipe';
import { ImageLoaderDirective } from './directives/imageLoader.directive';
import { TableComponent } from './components/ResponsiveTable/table/table.component';
import { ContextmenuComponent } from './components/ResponsiveTable/contextmenu/contextmenu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderBy, SearchPipe, SearchReport, SortPipe, SortObjectPipe, SearchRowPipe, SortRowPipe, SearchPipeAsync } from '../common/pipes/orderBy.pipe';
import { FilterPipe } from '../common/pipes/filter.pipe';
import { DateAgoPipe } from '../common/pipes/dateAgo.pipe';
import { ActionmenuComponent } from './components/ResponsiveTable/actionmenu/actionmenu.component';
import { ReportDatePickerComponent } from './components/report-date-picker/report-date-picker.component';
import { UploadMultipleComponent } from './components/upload-multiple/upload-multiple.component';
import { CheckPermissionAddDirective, CheckPermissionUpdateDirective, CheckPermissionCensorDirective, CheckPermissionViewDirective, CheckPermissionDeleteDirective, CheckPermissionIsCheckDirective } from './directives/CheckPermission.Directive';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { LoadingProgressComponent } from './components/loading-progress/loading-progress.component';

import { ViewDetailComponent } from './components/view-detail/view-detail.component';
import { DebounceClickDirective } from './directives/debounce.Directive';
import { FocusInputDirective } from './directives/focusInput.directive';
import { PagingDataComponent } from './components/paging-data/paging-data.component';
import { OverlayLoadingDirective } from './directives/overlay-loading.Directive';
import { OverlayLoadingElmComponent } from './components/overlay-loading-elm/overlay-loading-elm.component';

import { CustomTooltipDirective } from 'src/app/shared/directives/TooltipDirective';
import { EditorComponent } from './components/editor/editor.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { EditorDirective } from './directives/EditorDirective';
import { SafePipe } from '../common/pipes/safe.pipe';
import { ResizeTableDirective } from './directives/resize-table.directive';
import { YesNoConfirmDialogComponent } from './components/editor-confirm-dialog/yesno-confirm-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { BillEditPagingComponent } from './components/bill/bill-edit-paging/bill-edit-paging.component';
import { GuideShowComponent } from './components/guide-show/guide-show.component';
import { ShortcutHintComponent } from './components/shortcut-hint/shortcut-hint.component';
import { PopupDetailErrorComponent } from './components/popup-detail-error/popup-detail-error.component';
import { ListErrorComponent } from './components/popup-detail-error/list-error/list-error.component';
import { InputUnixDatePickerComponent } from './components/input-date-time-picker/input-unix-date-picker/input-unix-date-picker.component';
import { CMSTableComponent } from './components/CMSResponsiveTable/cms-table/cms-table.component';
import { CMSContextmenuComponent } from './components/CMSResponsiveTable/cms-contextmenu/cms-contextmenu.component';
import { CMSActionmenuComponent } from './components/CMSResponsiveTable/cms-actionmenu/cms-actionmenu.component';
import { CMSDashboardTableComponent } from './components/CMSResponsiveTable/cms-dashboard-table/cms-dashboard-table.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '/assets', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  // onMonacoLoad: () => { } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxPaginationModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  declarations: [
    AnchorDirective,
    ConfirmDialogComponent,
    DropdownDirective,
    SelectControlDirective,
    CustomTooltipDirective,
    TabsDirective,
    TruncatePipe,
    SearchPipe,
    SearchPipeAsync,
    FilterPipe,
    SearchReport,
    SumPipe,
    OrderBy,
    SortPipe,
    DateAgoPipe,
    SafePipe,
    SortObjectPipe,
    SearchRowPipe,
    SortRowPipe,

    FormDefaultDirective,
    TransformFormDirective,
    Error404Page,
    ToNumberPipe,
    InputNumberDirective,
    ValidateInputDirective,
    ImageLoaderDirective,
    CheckPermissionAddDirective,
    CheckPermissionUpdateDirective,
    CheckPermissionDeleteDirective,
    CheckPermissionViewDirective,
    CheckPermissionCensorDirective,
    CheckPermissionIsCheckDirective,
    InputFieldRequiredComponent,
    SelectFieldRequiredComponent,
    SelectMultiRequiredComponent,
    InputDateTimePickerComponent,
    InputDatePickerComponent,
    InputTimePickerComponent,
    TableComponent,
    ContextmenuComponent,
    ActionmenuComponent,
    ReportDatePickerComponent,
    UploadMultipleComponent,
    Error403Page,
    ActivityLogComponent,
    LoadingProgressComponent,
    ViewDetailComponent,
    DebounceClickDirective,
    FocusInputDirective,
    PagingDataComponent,
    OverlayLoadingDirective,
    OverlayLoadingElmComponent,
    EditorComponent,
    EditorDirective,
    ResizeTableDirective,
    YesNoConfirmDialogComponent,
    GuideShowComponent, 
    BillEditPagingComponent,
    ShortcutHintComponent,
    PopupDetailErrorComponent,
    ListErrorComponent,
    InputUnixDatePickerComponent, 

    // CmS table, context menu, action
    CMSTableComponent, 
    CMSContextmenuComponent, 
    CMSActionmenuComponent,
    CMSDashboardTableComponent
  ],
  exports: [
    AnchorDirective,
    DropdownDirective,
    TabsDirective,
    SelectControlDirective,
    CustomTooltipDirective,
    Error403Page,
    ToNumberPipe,
    SumPipe,
    OrderBy,
    DateAgoPipe,
    SortPipe,
    SearchPipe,
    SearchPipeAsync,
    FilterPipe,
    SafePipe,
    SortObjectPipe,
    SearchReport,
    SearchRowPipe,
    SortRowPipe,
    InputNumberDirective,
    ImageLoaderDirective,
    CheckPermissionAddDirective,
    CheckPermissionUpdateDirective,
    CheckPermissionDeleteDirective,
    CheckPermissionViewDirective,
    CheckPermissionCensorDirective,
    CheckPermissionIsCheckDirective,
    InputFieldRequiredComponent,
    SelectFieldRequiredComponent,
    SelectMultiRequiredComponent,
    InputDateTimePickerComponent,
    InputDatePickerComponent,
    InputTimePickerComponent,
    TableComponent,
    ContextmenuComponent,
    ActionmenuComponent,
    ReportDatePickerComponent,
    UploadMultipleComponent,
    ActivityLogComponent,
    LoadingProgressComponent,
    ViewDetailComponent,
    DebounceClickDirective,
    FocusInputDirective,
    PagingDataComponent,
    OverlayLoadingDirective,
    OverlayLoadingElmComponent,
    EditorComponent,
    EditorDirective,
    ResizeTableDirective,
    NgSelectModule,
    NgOptionHighlightModule,
    BillEditPagingComponent,
    GuideShowComponent,
    ShortcutHintComponent,
    PopupDetailErrorComponent,
    ListErrorComponent,
    InputUnixDatePickerComponent, 

    // CMS table, action, menu,...
    CMSTableComponent, 
    CMSContextmenuComponent, 
    CMSActionmenuComponent, 
    CMSDashboardTableComponent
  ]
})
export class SharedModule { }
