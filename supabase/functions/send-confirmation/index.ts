import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { Resend } from "resend";

try {
  const env = Deno.readTextFileSync(".env");
  env.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    Deno.env.set(key.trim(), value.trim());
  });
} catch (error) {
  console.log("No .env file found, using system environment variables");
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate content type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return errorResponse(400, "Invalid content type");
    }

    // Validate body exists
    const clonedReq = req.clone();
    const bodyText = await clonedReq.text();
    if (!bodyText) {
      return errorResponse(400, "Empty request body");
    }

    // Parse JSON
    const { email } = JSON.parse(bodyText);

    if (!validateEmail(email)) {
      return errorResponse(400, "Invalid email format");
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: "Viro AI <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to the Viro AI Waitlist!",
      html: `...your email template...`,
    });

    if (error) throw error;

    console.log("Email sent:", data?.id);
    return successResponse();
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, error.message);
  }
});

// Helper functions
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function successResponse() {
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
