export function formatMoney(number, decimals = 2, decimalPoint = '.', thousandsSeparator = ',') {
    if (isNaN(number)) {
      return '0.00'; // Handle non-numeric input
    }
  
    number = Math.abs(number); // Convert to positive number
  
    const parts = number.toFixed(decimals).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    const decimalPart = parts[1] ? `${decimalPoint}${parts[1]}` : '';
  
    return `${(number < 0 ? '-' : '')}${integerPart}${decimalPart}`;
  }