
import { supabase } from "@/integrations/supabase/client";

export type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: params,
    });

    if (error) {
      console.error("Error sending email:", error);
      return false;
    }

    return data?.success || false;
  } catch (error) {
    console.error("Unexpected error sending email:", error);
    return false;
  }
};

export const sendEventConfirmation = async (
  name: string,
  email: string,
  eventTitle: string,
): Promise<boolean> => {
  const html = `
    <h1>Thank you for registering, ${name}!</h1>
    <p>Your registration for <strong>${eventTitle}</strong> has been confirmed.</p>
    <p>We look forward to seeing you at the event.</p>
    <p>Best regards,<br>The Mulu Wongel Team</p>
  `;

  return sendEmail({
    to: email,
    subject: `Registration Confirmed: ${eventTitle}`,
    html,
  });
};

export const sendDonationReceipt = async (
  email: string,
  amount: number,
  date: string,
): Promise<boolean> => {
  const html = `
    <h1>Thank You for Your Donation!</h1>
    <p>We have received your generous donation of <strong>$${amount}</strong> on <strong>${date}</strong>.</p>
    <p>Your contribution helps us continue our mission and make a positive impact in our community.</p>
    <p>This email serves as your receipt for tax purposes.</p>
    <p>Gratefully,<br>The Mulu Wongel Team</p>
  `;

  return sendEmail({
    to: email,
    subject: "Thank You for Your Donation",
    html,
  });
};
