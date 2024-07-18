export function formatMoney(number, decimals = 2, decimalPoint = '.', thousandsSeparator = ',') {
  if(!number){
    return '0.00';
  }
  if (isNaN(number)) {
    return '0.00'; // Handle non-numeric input
  }

  const isNegative = number < 0;
  number = Math.abs(number); // Convert to positive number for formatting

  const parts = number.toFixed(decimals).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const decimalPart = parts[1] ? `${decimalPoint}${parts[1]}` : '';

  return `${isNegative ? '-' : ''}${integerPart}${decimalPart}`;
}
