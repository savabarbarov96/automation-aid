
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
  purpose: string;
  contact_method: 'email' | 'phone' | 'both';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();

    // Send confirmation email to user
    await resend.emails.send({
      from: "Automation Aid <contact@yourdomain.com>",
      to: [data.email],
      subject: "Thank you for contacting Automation Aid!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Thank you for contacting us!</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://your-domain.com/logo.png" alt="Automation Aid" style="max-width: 200px;">
              </div>
              <div class="content">
                <h1>Thank you for reaching out, ${data.name}!</h1>
                <p>We've received your message regarding ${data.purpose} services.</p>
                <p>Our team will review your request and get back to you shortly via ${data.contact_method === 'both' ? 'email or phone' : data.contact_method}.</p>
                <p>Here's a summary of your message:</p>
                <ul>
                  <li>Company: ${data.company}</li>
                  <li>Service: ${data.purpose}</li>
                  ${data.phone ? `<li>Phone: ${data.phone}</li>` : ''}
                  <li>Message: ${data.message}</li>
                </ul>
              </div>
              <div class="footer">
                <p>Best regards,<br>The Automation Aid Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "Automation Aid <contact@yourdomain.com>",
      to: ["your-admin-email@yourdomain.com"],
      subject: "New Contact Form Submission",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
              }
              .details {
                margin: 20px 0;
              }
              .details dt {
                font-weight: bold;
              }
              .details dd {
                margin-left: 0;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <h1>New Contact Form Submission</h1>
                <div class="details">
                  <dt>Name:</dt>
                  <dd>${data.name}</dd>
                  
                  <dt>Company:</dt>
                  <dd>${data.company}</dd>
                  
                  <dt>Email:</dt>
                  <dd>${data.email}</dd>
                  
                  ${data.phone ? `
                    <dt>Phone:</dt>
                    <dd>${data.phone}</dd>
                  ` : ''}
                  
                  <dt>Service:</dt>
                  <dd>${data.purpose}</dd>
                  
                  <dt>Preferred Contact:</dt>
                  <dd>${data.contact_method}</dd>
                  
                  <dt>Message:</dt>
                  <dd>${data.message}</dd>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
