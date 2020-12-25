import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmsaccount',
  templateUrl: './cmsaccount.component.html',
  styleUrls: ['./cmsaccount.component.scss']
})
export class CMSAccountComponent implements OnInit {

  constructor() { }


  selectedValueTab: any;
  fakeData = [{ "id": 1, "categoryName": "Đồ ăn", "description": "Đồ ăn" }, { "id": 2, "categoryName": "Nước uống", "description": "Nước uống" }, { "id": 3, "categoryName": "Khác", "description": "Thuốc lá, cỏ" }]
  ngOnInit(): void {
  }

  configTable = {
    columns: [
      {
        title: "Số thứ tự",
        value: "id",
        isShow: true
      },
      {
        title: "Tên danh mục",
        value: "categoryName",
        isShow: true
      },
      {
        title: "Mô tả",
        value: "description",
        isShow: true
      }
    ],

    eventTable: [
      {
        name: 'Xem',
        icon: 'fa-eye',
        action: (item: any) => {
           console.log(item);
        },
        isShow: true
      },
      {
        name: 'Xem(Tab mới)',
        icon: 'fa-eye',
        action: (item: any) => {
          console.log(item);
        },
        isShow: false
      },
    ]

  }

  viewmode(event) {
    console.log(event);
  }
}
