
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company: string;
  message: string;
  service: string;
  contactMethod: 'email' | 'phone' | 'both';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    console.log("Received form data:", data);

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "Automation Aid <onboarding@resend.dev>",
      to: [data.email],
      subject: "Thank you for contacting Automation Aid!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Thank you for contacting us!</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <h1>Thank you for reaching out, ${data.name}!</h1>
                <p>We've received your message regarding ${data.service} services.</p>
                <p>Our team will review your request and get back to you shortly via ${
                  data.contactMethod === 'both' 
                    ? 'email or phone' 
                    : data.contactMethod
                }.</p>
                <hr>
                <h3>Message Details:</h3>
                <ul>
                  <li>Company: ${data.company}</li>
                  <li>Service: ${data.service}</li>
                  ${data.phone ? `<li>Phone: ${data.phone}</li>` : ''}
                  <li>Message: ${data.message}</li>
                </ul>
                <hr>
                <p>Best regards,<br>The Automation Aid Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("User email result:", userEmailResult);

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Automation Aid <onboarding@resend.dev>",
      to: ["your-admin-email@domain.com"], // Replace with your admin email
      subject: "New Contact Form Submission - Automation Aid",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <h1>New Contact Form Submission</h1>
                <hr>
                <h3>Contact Details:</h3>
                <ul>
                  <li>Name: ${data.name}</li>
                  <li>Company: ${data.company}</li>
                  <li>Email: ${data.email}</li>
                  ${data.phone ? `<li>Phone: ${data.phone}</li>` : ''}
                  <li>Service: ${data.service}</li>
                  <li>Contact Method: ${data.contactMethod}</li>
                  <li>Message: ${data.message}</li>
                </ul>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Admin email result:", adminEmailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmail: userEmailResult, 
        adminEmail: adminEmailResult 
      }), 
      {
        status: 200,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email",
        details: error 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
      }
    );
  }
};

serve(handler);
