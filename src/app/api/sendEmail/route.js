import sgMail from "@sendgrid/mail";

export async function POST(req) {
  try {
    const { to, name, message } = await req.json();

    sgMail.setApiKey(process.env.NEXT_PUBLIC_SEND_GRID_KEY); // Set your SendGrid API key

    // Email to the Client (User)
    const clientEmail = {
      to, // Send to client
      from: process.env.NEXT_PUBLIC_FROM_EMAIL, // Your verified SendGrid sender email
      templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID_CLIENT, // Client email template ID
      dynamicTemplateData: {
        name: name,
        message: message,
        email: to, // Client's email
      },
    };

    // Email to the Admin 2
    const adminEmail = {
      to: process.env.NEXT_PUBLIC_FROM_EMAIL, // Your email (Admin)
      from: process.env.NEXT_PUBLIC_FROM_EMAIL, // Your verified SendGrid sender email
      templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID, // Admin email template ID
      dynamicTemplateData: {
        name: name,
        email: to, // Client's email
        message: message
      },
    };

    // Send both emails
    await sgMail.send([clientEmail, adminEmail]);

    return Response.json({ message: "Emails sent successfully!" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
