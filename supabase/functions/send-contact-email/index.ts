
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { service, company, name, email, phone, message, contactMethod } = await req.json()

    const data = await resend.emails.send({
      from: 'Automation Aid <mail@automationaid.eu>',
      to: ['slavastinov@gmail.com'],
      subject: 'Ново запитване от уебсайта',
      html: `
        <h2>Ново запитване от уебсайта</h2>
        <p><strong>Име:</strong> ${name}</p>
        <p><strong>Компания:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Услуга:</strong> ${service}</p>
        <p><strong>Предпочитан начин за контакт:</strong> ${contactMethod}</p>
        <p><strong>Съобщение:</strong></p>
        <p>${message}</p>
      `,
    })

    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
