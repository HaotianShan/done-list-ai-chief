
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Set up CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: EmailRequest = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "AI Chief of Staff <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the AI Chief of Staff Waitlist!",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 100%); height: 5px; margin-bottom: 20px;"></div>
          
          <h1 style="color: #4F46E5; margin-bottom: 24px;">You're on the List!</h1>
          
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">Thanks for joining the AI Chief of Staff waitlist! You're officially in line for early access.</p>
          
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">We're building an AI assistant that truly <em>acts</em> on your behalf—managing emails, handling tasks, and optimizing your schedule with human-like intuition.</p>
          
          <div style="background-color: #f5f5f7; border-left: 4px solid #4F46E5; padding: 16px; margin: 24px 0;">
            <p style="font-size: 16px; line-height: 1.5; margin: 0;"><strong>What's next?</strong> We'll keep you updated on our launch timeline and may reach out with opportunities to provide feedback as we refine the product.</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5;">Looking forward to helping you turn your to-do lists into <em>done</em> lists,</p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">The AI Chief of Staff Team</p>
          
          <div style="font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 16px;">
            <p>If you didn't sign up for the AI Chief of Staff waitlist, please disregard this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
