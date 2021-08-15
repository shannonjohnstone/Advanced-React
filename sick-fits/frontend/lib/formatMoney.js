export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) options.minimumFractionDigits = 0;

  return Intl.NumberFormat('en-US', options).format(amount / 100);
}
