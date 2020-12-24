import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ReadMoneyHelper {

  constructor() {
  }

  public readGroup(group) {
    const readDigit = [' Không', ' Một', ' Hai', ' Ba', ' Bốn', ' Năm', ' Sáu', ' Bảy', ' Tám', ' Chín' ];
    let temp = '';
    if (group == '000') { return ''; }
    // read number hundreds
    temp = readDigit[parseInt(group.substring(0, 1))] + ' Trăm';
    // read number tens
    if (group.substring(1, 2) == 0) {
        if (group.substring(2, 3) == 0) { return temp; } else {
            temp += ' Lẻ' + readDigit[parseInt(group.substring(2, 3))];
            return temp;
        }
    } else {
        temp += readDigit[parseInt(group.substring(1, 2))] + ' Mươi';
    }
    // read number

    if (group.substring(2, 3) == '5') { temp += ' Lăm'; } else if (group.substring(2, 3) != '0') { temp += readDigit[parseInt(group.substring(2, 3))]; }
    return temp;
}
readMoney(num) {
    if (isNaN(num)) {
      return;
    }
    num = num.toFixed(0);
    num = num.toString();
    if ((num == null) || (num === '')) { return ''; }
    let temp = '';

    // length <= 18
    while ((num as any).length < 18) {
        num = '0' + num;
    }

    const g1 = (num as any).substring(0, 3);
    const g2 = (num as any).substring(3, 6);
    const g3 = (num as any).substring(6, 9);
    const g4 = (num as any).substring(9, 12);
    const g5 = (num as any).substring(12, 15);
    const g6 = (num as any).substring(15, 18);
    // read group1 ---------------------
    if (g1 !=  '000') {
        temp = this.readGroup(g1);
        temp += ' Triệu';
    }
    // read group2-----------------------
    if (g2 !=  '000') {
        temp += this.readGroup(g2);
        temp += ' Nghìn';
    }
    // read group3 ---------------------
    if (g3 !=  '000') {
        temp += this.readGroup(g3);
        temp += ' Tỷ';
    } else if (temp != '') {
        temp += ' Tỷ';
    }

    // read group2-----------------------
    if (g4 !=  '000') {
        temp += this.readGroup(g4);
        temp += ' Triệu';
    }
    // ---------------------------------
    if (g5 !=  '000') {
        temp += this.readGroup(g5);
        temp += ' Nghìn';
    }
    // -----------------------------------

    temp = temp + this.readGroup(g6);
    // ---------------------------------
    // Refine
    temp = temp.replace('Một Mươi', 'Mười');
    temp = temp.trim();
    temp = temp.replace('Không Trăm', '');
//        if (temp.indexOf("Không Trăm") == 0) temp = temp.substring(10);
    temp = temp.trim();
    temp = temp.replace('Mười Không', 'Mười');
    temp = temp.trim();
    temp = temp.replace('Mươi Không', 'Mươi');
    temp = temp.trim();
    if (temp.indexOf('Lẻ') == 0) { temp = temp.substring(2); }
    temp = temp.trim();
    temp = temp.replace('Mươi Một', 'Mươi Mốt');
    temp = temp.trim();

    // Change Case
    return '' + temp.substring(0, 1).toUpperCase() + temp.substring(1).toLowerCase() + ' đồng chẵn.';
}
}
