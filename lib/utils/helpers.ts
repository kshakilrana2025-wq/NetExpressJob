export function generateReferralCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(amount);
}
