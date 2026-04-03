export async function verifyPayment(method: string, transactionId: string, amount: number, paymentMethod: any): Promise<boolean> {
  // In manual mode, always return false so admin verifies.
  // In API mode, you'd integrate real bKash/Nagad/Rocket API.
  return false;
}

export async function activateUserAndGiveReferralBonus(userId: any, transactionId: any) {
  // This function should be defined elsewhere; we already have it in admin payments route.
  // Provide a placeholder to avoid import errors.
  console.log('Activation called', userId, transactionId);
}
