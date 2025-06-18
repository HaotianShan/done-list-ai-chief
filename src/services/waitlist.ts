import { supabase } from "@/integrations/supabase/client";

export const joinWaitlist = async (email: string) => {
  try {
    // Add email to waitlist in database
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (dbError) throw dbError;

    // Send confirmation email via edge function
    const { error: emailError } = await supabase.functions.invoke(
      "send-confirmation",
      {
        body: { email },
      }
    );

    if (emailError) throw emailError;

    return { success: true };
  } catch (error: any) {
    console.error("Error joining waitlist:", error);

    // Handle unique constraint violation more gracefully
    if (error?.code === "23505") {
      return { success: true, alreadyJoined: true };
    }

    return { success: false, error: error.message };
  }
};
