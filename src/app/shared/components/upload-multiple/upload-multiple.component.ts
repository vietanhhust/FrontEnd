import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { imgShow } from 'src/app/common/helpers/file.helper';
import { InventoryInputImg } from 'src/app/core/models/stock/Inventory';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.component.html',
  styleUrls: ['./upload-multiple.component.scss']
})
export class UploadMultipleComponent implements OnInit, OnChanges {
  @ViewChild('file', { static: false }) file: ElementRef;
  @Input() title: string;
  @Input() mode: string;
  @Input() data: any;
  @Output() lstFile = new EventEmitter<any>();
  imgArr: InventoryInputImg[] = [];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].previousValue != changes['data'].currentValue) {
      if (this.data) {
        this.imgArr = this.data;
      }
    }
  }
  imgUpload() {
    const files = this.file.nativeElement.files;
    if (files.length == 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (this.imgArr.find(img => img.name.toLowerCase() == f.name.toLowerCase())) {
        continue;
      }
      this.imgArr.push({ name: f.name, id: 0, url: '', file: f });
    }
    this.file.nativeElement.value = '';
    this.lstFile.emit(this.imgArr);
  }
  imgRemove(img: InventoryInputImg): void {
    const index = this.imgArr.indexOf(img);
    if (index >= 0) {
      this.imgArr.splice(index, 1);
    }
    this.lstFile.emit(this.imgArr);
  }
  imgShow(img) {
    return imgShow(img);
  }
}
