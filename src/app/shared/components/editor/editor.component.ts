import { Component, OnInit, Output, EventEmitter, Input, ElementRef, OnChanges, OnDestroy, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { SessionService } from 'src/app/core/services/base/session.service';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { Router } from '@angular/router';
import { register } from 'src/app/core/models/editor/keywordSuggestion'
import { ToastrService } from 'ngx-toastr';
import { PopupCountService } from '../../services/popupCount.service';
import { PopupService } from '../../services/popup.service';
import { confirmType } from '../editor-confirm-dialog/yesno-confirm-dialog.component';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent extends BaseComponent implements IModalComponent, OnDestroy, AfterViewInit {

  orginalData: string = ''

  @ViewChild('mona', { static: false }) mona;
  @Output()
  close = new EventEmitter();
  edit: monaco.editor.IStandaloneCodeEditor;
  code: any;
  @Input() data: any;
  suggestions = [];
  isLoaded = false;
  options = {};
  suggester: any;
  regis: any;
  isEditor = true;
  constructor(
    route: Router,
    sessionService: SessionService, private toast: ToastrService, private renderer: Renderer2,
    private popup: PopupService
  ) {
    super(EnumModule.ProgrammingFunction, EnumAction.View, route, sessionService);
  }
  ngAfterViewInit(): void {
    this.suggestions = [];
    setTimeout(() => {
      this.loadCode();
    }, 1200);
  }

  ngOnInit() {
    super.ngOnInit();
    this.orginalData = this.data.value;
    if (!this.orginalData) {
      this.orginalData = '';
    }
    this.codeEditorConfirm();
  }

  loadCode() {

    if (this.data.language != 'javascript') {
      //this.regis =  register(this.data.language, this.data.suggetList);
    } else {

    }

    this.isLoaded = true;
    this.create();
  }

  create() {
    const $this = this;
    this.edit = monaco.editor.create(document.getElementById('monacoeditor'), {
      language: this.data.language,
      value: this.data.value,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto'
      },
      theme: 'vs-dark',
      automaticLayout: true,
      readOnly: false,
      colorDecorators: true,
      codeLens: true,
      acceptSuggestionOnCommitCharacter: true,
      dragAndDrop: true,
      folding: true,
      renderLineHighlight: 'all',
    });
    // tslint:disable-next-line: no-bitwise
    this.edit.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
      //$this.saveCode();
    });

  }
  ngOnDestroy() {
    // this.regis.dispose();
    this.edit.dispose();
  }

  codeEditorConfirm() {
    let $this = this;
    console.log('codeEditorConfirm')
    this.renderer.listen('body', 'keyup.escape', (e) => {
      if (PopupCountService.popups[PopupCountService.popups.length - 1].embededInstance == this) {

        let value = this.edit.getValue();

        if (this.orginalData == value) {
          this.saveCode();
        } else {
          this.popup.yesNoConfirm('Bạn muốn thực hiện lưu dữ liệu không?', 'Dữ liệu thay đổi', null, 'Đồng ý', ' Không')
            .subscribe(data => {
              console.log('subscribe',data)
              if (data == confirmType.confirm) {
                this.saveCode();
              } else if (data == confirmType.denied) {
                this.close.next(this.orginalData)
              }
            })

        }
      }
    })
  }

  saveCode() {
    let result = {
      action: 'ok',
      value: this.edit.getValue()
    }
    this.close.next(result);
  }
}
