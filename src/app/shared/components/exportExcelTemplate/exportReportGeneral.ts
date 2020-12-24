import { Component, Input } from '@angular/core';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'export-report-genegal',
    template: `
    <div class="exportRG">
    <table id="exportRG" style="boder:1px solid">
        <thead>
        <tr>
        <td colspan="7">This is a merged cell</td>
        </tr>
        <tr>
        <td colspan="7">This is a merged cell</td>
        </tr>
        <tr>
        <td colspan="7">This is a merged cell</td>
        </tr>
        <tr>
        <td colspan="7">This is a merged cell</td>
        </tr>
            <tr>
                <th>Mã mặt hàng</th>
                <th>Tên mặt hàng</th>
                <th>Đơn vị chính</th>
                <th>Tồn đầu kỳ</th>
                <th>Nhập trong kỳ</th>
                <th>Xuất trong kỳ</th>
                <th>Tồn cuối kỳ</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let item of data">
                <td>{{item.productCode}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.unitName}}</td>
                <td>{{item.primaryQualtityBefore| number:'1.0-10'}}</td>
                <td>{{item.primaryQualtityInput| number:'1.0-10'}}</td>
                <td>{{item.primaryQualtityOutput| number:'1.0-10'}}</td>
                <td>{{item.primaryQualtityAfter| number:'1.0-10'}}</td>
            </tr>
        </tbody>
    </table>
</div>
    `,

})
export class ExportReportGeneral {
    @Input()
    data: any;
    constructor() {
      // console.log(this.data)
    }
}
