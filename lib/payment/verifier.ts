export async function verifyPayment(method: string, transactionId: string, amount: number, paymentMethod: any): Promise<boolean> {
  // In manual mode, always return false; admin will verify manually.
  // In API mode, you would integrate real bKash/Nagad/Rocket API.
  return false;
}

export async function activateUserAndGiveReferralBonus(userId: any, transactionId: any) {
  console.log('Activation called', userId, transactionId);
}
