import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  try {
    const emailData: any = {
      from: "churchpaq@noreply.onassis.dev",
      to: [to],
      subject,
    };

    if (html) {
      emailData.html = html;
    } else if (text) {
      emailData.text = text;
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail(email: string, resetUrl: string) {
  const subject = "Restablecer tu contraseña";
  const text = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Restablecer tu contraseña</h2>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para continuar:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Restablecer contraseña
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
      <p style="color: #666; font-size: 14px;">Este enlace expirará en 1 hora por seguridad.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    text,
    html,
  });
}

export async function sendConfirmationEmail(email: string, confirmUrl: string) {
  const subject = "Confirma tu dirección de correo electrónico";
  const text = `Haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico: ${confirmUrl}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">¡Bienvenido/a!</h2>
      <p>Gracias por registrarte. Para completar tu registro, necesitamos confirmar tu dirección de correo electrónico.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${confirmUrl}" 
           style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Confirmar correo electrónico
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">Si no creaste una cuenta, puedes ignorar este correo de forma segura.</p>
      <p style="color: #666; font-size: 14px;">Este enlace expirará en 24 horas por seguridad.</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    text,
    html,
  });
}
