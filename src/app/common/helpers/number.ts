export function formatNumber1(num: number): string {
  return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatNumber(amount, decimalCount = 4, decimal = '.', thousands = ',') {
  return formatThousandNumber(amount, decimal, thousands);
}
export function formatThousandNumber(amount, decimal = '.', thousands = ',', decimalPlace?) {
  try {

    if (amount === '') return ''
    if (amount === 0 || (amount + '').trim() === '0') return '0';
    if (!amount) return '';

    amount = amount + '';

    if (amount && amount.length > 1) {
      if (amount.substr(0, 1) == 0 && amount.substr(1, 1) !== '.') {
        amount = amount.substring(1);
      }
    }
    const negativeSign = amount < 0 ? '-' : '';
    amount = amount ? amount : '';
    const str = ((decimalPlace && decimalPlace !== undefined) || decimalPlace == 0) ? parseFloat(parseFloat(amount).toFixed(parseInt(decimalPlace, null))).toString() : amount.toString();
    const idxOfDecimal = str.lastIndexOf(decimal);
    let intNumber = str;
    let decNumber = '';
    if (idxOfDecimal > 0) {
      // tslint:disable-next-line: radix
      intNumber = Math.abs(parseInt(str.substring(0, idxOfDecimal))).toString();
      decNumber = str.substring(idxOfDecimal);
    }
    intNumber = intNumber.split('').reverse().join('');
    let result = '';
    let l = Math.floor(intNumber.length / 3);
    if (intNumber.length % 3 > 0) { l++; }
    for (let i = 0; i < l; i++) {
      if (i > 0) { result += thousands; }
      if (i * 3 + 3 < intNumber.length) {
        result += intNumber.substring(i * 3, i * 3 + 3);
      } else {
        result += intNumber.substring(i * 3);
      }
    }
    let rsFinal = negativeSign + result.split('').reverse().join('').replace('-', '') + decNumber;
    if (rsFinal.indexOf('-,') >= 0) {
      rsFinal = rsFinal.replace('-,', '-');
    }
    return rsFinal;
  } catch (e) {
    console.log(e);
  }
}
export function isNumber(str: string): boolean {
  return str && str.trim() && !isNaN(Number(str));
}


export function formatNumberForFlowchart(amount, decimalCount = 4, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;

    let decimalNumber = '';
    if (Math.abs(amount - parseInt(i)) > 0) {
      decimalNumber = decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : '';
      while (decimalNumber[decimalNumber.length - 1] == '0') {
        decimalNumber = decimalNumber.substring(0, decimalNumber.length - 1);
      }
    }

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + decimalNumber;
  } catch (e) {
    console.log(e);
  }
}
