
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type EmailRequest = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // In a real implementation, we'd use a service like SendGrid, Mailchimp, Resend, etc.
    // For this demo, we'll just log the email data and return a success response
    
    const { to, subject, html, from }: EmailRequest = await req.json();
    
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`From: ${from || "default-sender@example.com"}`);
    console.log(`Body: ${html}`);
    
    // Simulate a delay as if we were sending an actual email
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
