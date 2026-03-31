export const formatCurrency = (amount, options = {}) => {
  const { 
    showDecimal = false, 
    compact = false 
  } = options;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
    notation: compact ? 'compact' : 'standard',
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const CURRENCY_SYMBOL = '₹';
