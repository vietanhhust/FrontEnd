import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef, EventEmitter} from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit{
  @Input() data: any;
  @Input() moduleid: any;

  isShowPage = true;
  constructor(private cd: ChangeDetectorRef) {
  }
  changeValue () {
  this.isShowPage = false;
  if (this.data.product && this.data.data.details) {
    const ids = [];
    this.data.data.details.filter(x => {
      ids.push(x.productId);
    });
    // this._productService.searchByIds({moduleId: this.moduleid}, ids).subscribe(r => {
    //   if (r) {
    //     r.filter(x => {
    //       this.data.data.details.filter(y => {
    //         if (x.productId === y.productId) {
    //           y.product = x.productCode + '/' + x.productName,
    //             y.productName = x.productName,
    //             y.unitName = x.unitName,
    //             y.primaryUnitName = x.unitName,
    //             y.productCode = x.productCode;
    //             // y.Quantity = x.stockProductModelList ? x.stockProductModelList.map(item => item.primaryQuantityRemaining)
    //             // .reduce((prev, curr) => prev + curr, 0) : 0;
    //         }
    //      });
    //    });
    //    this.isShowPage = true;
    //   }
    // });
  }
  }
  ngOnInit() {
  }
  close() {
    $('.view-detail').removeClass('open');
  }
}
