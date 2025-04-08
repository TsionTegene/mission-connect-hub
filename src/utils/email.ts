
export type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  // Mock implementation for frontend development
  console.log("Sending email:", params);
  return Promise.resolve(true);
};

export const sendEventConfirmation = async (
  name: string,
  email: string,
  eventTitle: string,
): Promise<boolean> => {
  console.log(`Mock: Sending confirmation email to ${name} at ${email} for ${eventTitle}`);
  return Promise.resolve(true);
};

export const sendDonationReceipt = async (
  email: string,
  amount: number,
  date: string,
): Promise<boolean> => {
  console.log(`Mock: Sending donation receipt to ${email} for $${amount} on ${date}`);
  return Promise.resolve(true);
};
